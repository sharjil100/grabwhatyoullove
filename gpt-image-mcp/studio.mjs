#!/usr/bin/env node
// Brand image studio for "grabwhatyoulove".
// Runs gpt-image-2 edits/generations with per-image art direction while keeping
// one LOCKED BRAND LOOK constant. Usage:
//   node studio.mjs                 -> run every job
//   node studio.mjs hero-product product-4   -> run only those output names
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI, { toFile } from "openai";
import mime from "mime-types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RAW = path.join(ROOT, "public", "raw");
const OUT = path.join(ROOT, "public", "images");
fs.mkdirSync(OUT, { recursive: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── The constant that makes 12 different scenes feel like ONE brand ──────────
const BRAND =
  "BRAND LOOK (keep constant): palette of soft blush pink and warm cream with " +
  "deep burgundy accents and champagne/taupe tones; editorial luxury mood; soft " +
  "warm directional light; subtle sparkle and gentle bokeh; generous negative " +
  "space and breathing room; refined high-end product photography, photorealistic.";

// ── Applied to every EDIT so the real product is never altered ───────────────
const PRESERVE =
  "Preserve the actual product exactly as in the source photo: identical shape, " +
  "proportions, metal colour, gemstones, engraving and any brand text printed on " +
  "the product. Do not redesign, recolour or restyle the product. Remove ONLY the " +
  "promotional price-text overlays, watermarks, arrows and app UI from the source. " +
  "Change only background, surface, props, lighting and framing.";

const e = (s) => `${PRESERVE} ${s} ${BRAND}`; // edit prompt builder

// out = output filename in public/images; src = source in public/raw
const JOBS = [
  {
    out: "hero-product.png", src: "img1.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — HERO money shot. Keep the cream ring box and all the gemstone " +
      "rings exactly as the source. Set the open box on a smooth blush-pink studio " +
      "sweep with a soft natural drop shadow and a faint dusting of sparkle in the " +
      "air. Clean, minimal, centred, lots of breathing room — the signature shot."
    ),
  },
  {
    out: "product-1.jpg", src: "img1.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — rings on pale stone, minimal background. Arrange two or three of " +
      "these gemstone rings resting on a smooth pale stone, with a very soft blush " +
      "background that barely shows, warm directional light, one gentle shadow and " +
      "lots of quiet negative space so the rings dominate the frame."
    ),
  },
  {
    out: "product-2.jpg", src: "img9.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — on a soft marble pedestal. Stand this perfume bottle on a small " +
      "blush-veined marble pedestal, single warm directional light, deep shadow, " +
      "very minimal champagne backdrop."
    ),
  },
  {
    out: "product-3.jpg", src: "img3.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — necklace on stone. Drape this delicate crystal drop necklace over " +
      "a pale rough natural stone, warm soft directional light catching the crystals, " +
      "soft blush satin backdrop that barely shows, gentle shadows, editorial."
    ),
  },
  {
    out: "product-4.jpg", src: "img10.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — WORN editorial model shot. Show this exact pair of green-stone " +
      "silver earrings worn on the ear of an elegant model: soft warm skin, hair " +
      "swept back, blush background, shallow depth of field, refined crop on ear and " +
      "jawline. The earrings must match the source exactly (same silver filigree " +
      "shape, same emerald-green stones). Artistic licence on the model only."
    ),
  },
  {
    out: "product-5.jpg", src: "img6.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — gift-ready. Nestle this perfume bottle inside an open blush gift " +
      "box lined with cream tissue, a satin burgundy ribbon trailing beside it, " +
      "warm celebratory light."
    ),
  },
  {
    out: "product-6.jpg", src: "img7.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — vanity tray. Place this pink perfume bottle on a champagne mirror " +
      "vanity tray so it casts a soft reflection, a few blush petals nearby, dreamy " +
      "warm boudoir light."
    ),
  },
  {
    out: "product-7.jpg", src: "img8.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — floating product. Show this perfume bottle gently floating in " +
      "soft focus with drifting champagne sparkle particles and bokeh around it, " +
      "dreamy weightless luxury mood, blush-to-cream gradient backdrop."
    ),
  },
  {
    out: "product-8.jpg", src: "img3.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — WORN editorial model shot (different framing from the ear shot). " +
      "Drape this exact crystal drop necklace on the décolletage / collarbone of an " +
      "elegant model, soft warm skin, blush background, gentle editorial three-quarter " +
      "crop of neck and shoulder. The necklace must match the source exactly (same " +
      "crystal strands and dangling beads). Artistic licence on the model only."
    ),
  },
  {
    out: "product-9.jpg", src: "img5.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — layered jewellery on stone. Drape these several silver and crystal " +
      "pieces together over a pale rough natural stone, overlapping softly, warm " +
      "directional light, soft blush backdrop, hand-made layered-jewellery mood."
    ),
  },
  {
    out: "product-10.jpg", src: "img11.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — earrings on stone. Rest this pair of oxidised peacock jhumka " +
      "earrings against a pale smooth natural stone, soft warm directional light, " +
      "one gentle long shadow, soft blush backdrop that barely shows, minimal."
    ),
  },
  {
    out: "product-11.jpg", src: "img12.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — earrings on stone, warm. Place this pair of oxidised silver " +
      "chandelier earrings on a pale rough natural stone with warm directional light " +
      "and soft long shadows, blush-cream backdrop that barely shows."
    ),
  },
  // Pure text-to-image backdrop, no product.
  {
    out: "about-bg.jpg", type: "generate", quality: "medium", size: "1536x1024",
    prompt:
      "Soft blush-pink and warm cream draped silk texture, gentle folds, warm " +
      "directional light, faint champagne sparkle bokeh, deep burgundy shadow in " +
      "one corner, no objects, no text, dreamy editorial luxury backdrop. " + BRAND,
  },

  // ── v2: SAPPHIRE-style reference compositions, in the pink brand look ──────
  // Moody deeper-rose satin hero backdrop (cream/burgundy text reads on it).
  {
    out: "hero-bg.jpg", type: "generate", quality: "medium", size: "1536x1024",
    prompt:
      "Luxurious draped rose-pink and blush satin/silk filling the frame, deep " +
      "soft folds, warm low directional light from one side, richer mauve-rose in " +
      "the corners for depth, faint champagne sparkle bokeh, no objects, no text, " +
      "moody editorial luxury hero backdrop. " + BRAND,
  },
  // Single isolated hero ring on draped blush satin (the headline focal piece).
  {
    out: "hero-ring.png", src: "img1.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — single hero ring, reference editorial style. Take ONE of the " +
      "gemstone rings from this set and present it alone, standing upright in sharp " +
      "focus on softly draped blush-pink satin, dramatic but soft warm side light, " +
      "deep champagne shadow, faint sparkle, lots of negative space around it. " +
      "Remove the box and the other rings; isolate one beautiful ring."
    ),
  },
  // Jewellery laid on rough pale stone — the 'Handpicked' craftsmanship tile.
  {
    out: "card-on-stone.jpg", src: "img4.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — craftsmanship on stone, reference editorial style. Drape this " +
      "gold statement necklace and earring set over a pale raw stone / rough marble " +
      "chunk, warm directional light, soft long shadows, blush-cream backdrop, " +
      "hand-made luxury mood."
    ),
  },
  // Chain draped over stone — the 'Glamour that steals the show' tile.
  {
    out: "card-chain-stone.jpg", src: "img2.png", type: "edit", quality: "high",
    prompt: e(
      "TREATMENT — draped chain on stone, reference editorial style. Elegantly drape " +
      "this gold black-clover chain necklace over a pale rough natural stone, warm " +
      "soft light, gentle champagne reflections, cream backdrop, refined hand-made mood."
    ),
  },
];

function pickJobs(names) {
  if (!names.length) return JOBS;
  const set = new Set(names.map((n) => n.replace(/\.(png|jpg|jpeg)$/i, "")));
  return JOBS.filter((j) => set.has(j.out.replace(/\.(png|jpg|jpeg)$/i, "")));
}

async function run(job) {
  const outPath = path.join(OUT, job.out);
  const fmt = job.out.toLowerCase().endsWith(".png") ? "png" : "jpeg";
  const size = job.size || "1024x1024";
  let resp;
  if (job.type === "generate") {
    resp = await openai.images.generate({
      model: "gpt-image-2", prompt: job.prompt, size,
      quality: job.quality || "medium", output_format: fmt,
    });
  } else {
    const srcPath = path.join(RAW, job.src);
    const file = await toFile(fs.createReadStream(srcPath), job.src, {
      type: mime.lookup(srcPath) || "image/png",
    });
    resp = await openai.images.edit({
      model: "gpt-image-2", image: file, prompt: job.prompt, size,
      quality: job.quality || "high", output_format: fmt,
    });
  }
  const b64 = resp.data?.[0]?.b64_json;
  if (!b64) throw new Error("no image returned");
  fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`✓ ${job.out}  (${size}, ${job.quality || "high"}, ${kb} KB)`);
}

const jobs = pickJobs(process.argv.slice(2));
if (!jobs.length) {
  console.error("No matching jobs for:", process.argv.slice(2).join(", "));
  process.exit(1);
}
console.log(`Running ${jobs.length} job(s)...`);
for (const job of jobs) {
  try { await run(job); }
  catch (err) { console.error(`✗ ${job.out}: ${err?.message || err}`); }
}
console.log("Done.");
