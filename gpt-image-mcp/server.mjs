#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import OpenAI, { toFile } from "openai";
import mime from "mime-types";

// Construct the client lazily so the server still boots (and registers) when
// no key is present — we only need the key when a tool is actually invoked.
let _openai = null;
function getOpenAI() {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in the MCP server environment.");
    }
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

const server = new McpServer({
  name: "gpt-image-mcp",
  version: "1.0.0",
});

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

// Keep all file access inside the project directory so the tool can't read or
// write arbitrary paths on the machine.
function resolveInsideProject(userPath) {
  const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const abs = path.isAbsolute(userPath)
    ? path.resolve(userPath)
    : path.resolve(root, userPath);

  const rel = path.relative(root, abs);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`Path must stay inside project directory: ${root}`);
  }
  return abs;
}

function listImages(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .map((file) => path.join(dir, file));
}

// ── Tool 1: generate a brand-new image from a text prompt ──────────────────
server.tool(
  "generate_image",
  "Generate a new image from a text prompt using GPT Image and save it into a project directory.",
  {
    prompt: z.string().describe("What to draw, e.g. 'a minimalist logo of a fox, flat vector'."),
    outputPath: z
      .string()
      .default("generated-images/image.png")
      .describe("Output file path (relative to the project dir). Use a .png extension."),
    model: z.string().default("gpt-image-2"),
    size: z.string().default("1024x1024"),
    quality: z.enum(["low", "medium", "high", "auto"]).default("auto"),
  },
  async ({ prompt, outputPath, model, size, quality }) => {
    const openai = getOpenAI();
    const outAbs = resolveInsideProject(outputPath);
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });

    const response = await openai.images.generate({
      model,
      prompt,
      size,
      quality,
      output_format: "png",
    });

    const b64 = response.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image returned from the API.");

    fs.writeFileSync(outAbs, Buffer.from(b64, "base64"));
    return {
      content: [{ type: "text", text: `Saved generated image to ${outputPath}` }],
    };
  }
);

// ── Tool 2: edit every image in a directory ────────────────────────────────
server.tool(
  "edit_each_image_in_directory",
  "Edit every JPG, PNG, or WebP image in a project directory using GPT Image and save outputs to another directory.",
  {
    inputDir: z.string().describe("Directory containing input images, relative to the project directory."),
    outputDir: z.string().default("generated-images").describe("Directory for generated output images."),
    prompt: z.string().describe("Edit instruction, e.g. 'make this product photo look studio-lit on a white background'."),
    model: z.string().default("gpt-image-2"),
    size: z.string().default("1024x1024"),
    quality: z.enum(["low", "medium", "high", "auto"]).default("auto"),
    maxFiles: z.number().int().min(1).max(100).default(25),
  },
  async ({ inputDir, outputDir, prompt, model, size, quality, maxFiles }) => {
    const openai = getOpenAI();
    const inDir = resolveInsideProject(inputDir);
    const outDir = resolveInsideProject(outputDir);
    fs.mkdirSync(outDir, { recursive: true });

    const images = listImages(inDir).slice(0, maxFiles);
    if (images.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `No supported images found in ${inputDir}. Use .png, .jpg, .jpeg, or .webp.`,
          },
        ],
      };
    }

    const results = [];
    for (const imagePath of images) {
      const ext = path.extname(imagePath).toLowerCase();
      const baseName = path.basename(imagePath, ext);
      const outPath = path.join(outDir, `${baseName}-generated.png`);

      const file = await toFile(fs.createReadStream(imagePath), path.basename(imagePath), {
        type: mime.lookup(imagePath) || "image/png",
      });

      try {
        const response = await openai.images.edit({
          model,
          image: file,
          prompt,
          size,
          quality,
          output_format: "png",
        });

        const b64 = response.data?.[0]?.b64_json;
        if (!b64) {
          results.push({ input: imagePath, error: "No image returned" });
          continue;
        }
        fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
        results.push({ input: imagePath, output: outPath });
      } catch (err) {
        results.push({ input: imagePath, error: err?.message || String(err) });
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ processed: results.length, results }, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
