#!/usr/bin/env node
// Derives the remaining site assets from the generated images + logo.
// Run AFTER the gpt-image batch finishes:  npm run postprocess
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMG = path.join(ROOT, "public", "images");
const p = (f) => path.join(IMG, f);
const has = (f) => fs.existsSync(p(f));

// Key out the logo's black background: alpha ramps from the brightest channel,
// so pure-black bg -> transparent while rose-gold linework + burgundy wordmark
// stay opaque, with soft antialiased edges. Keeps original RGB.
async function keyBlack(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const maxC = Math.max(data[i], data[i + 1], data[i + 2]);
    data[i + 3] = Math.min(255, maxC * 3);
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

async function makeLogoMark() {
  if (!has("logo.png")) return console.warn("! logo.png missing, skip logo-mark");
  const buf = fs.readFileSync(p("logo.png"));
  const out = await keyBlack(buf);
  await out.png().toFile(p("logo-mark.png"));
  console.log("✓ logo-mark.png (transparent)");
}

async function makeFavicon() {
  if (!has("logo.png")) return console.warn("! logo.png missing, skip favicon");
  const meta = await sharp(p("logo.png")).metadata();
  // Bow sits centred, lower-middle of the square logo. Crop a square around it.
  const W = meta.width || 600;
  const H = meta.height || 600;
  const size = Math.round(W * 0.4);
  const left = Math.round(W / 2 - size / 2);
  const top = Math.round(H * 0.62 - size / 2);
  const cropped = await sharp(p("logo.png"))
    .extract({ left, top, width: size, height: size })
    .toBuffer();
  const keyed = await keyBlack(cropped);
  await keyed.resize(180, 180).png().toFile(p("favicon.png"));
  console.log("✓ favicon.png (bow crop)");
}

async function reuse(srcName, outName, dim, quality = 84) {
  if (!has(srcName)) return console.warn(`! ${srcName} missing, skip ${outName}`);
  await sharp(p(srcName))
    .resize(dim, dim, { fit: "cover" })
    .jpeg({ quality, mozjpeg: true })
    .toFile(p(outName));
  console.log(`✓ ${outName} (from ${srcName})`);
}

// category tiles reuse the two strongest matching shots
const CATS = [
  ["product-1.jpg", "cat-jewellery.jpg", 1200], // clover flat-lay
  ["product-6.jpg", "cat-perfume.jpg", 1200], // Miss Dior vanity
];
// 6 square IG crops chosen for variety: flat-lay / worn / macro / perfume / grouped
const INSTA = [
  ["product-1.jpg", "insta-1.jpg"],
  ["product-4.jpg", "insta-2.jpg"],
  ["product-3.jpg", "insta-3.jpg"],
  ["product-8.jpg", "insta-4.jpg"],
  ["product-6.jpg", "insta-5.jpg"],
  ["product-9.jpg", "insta-6.jpg"],
];

console.log("Post-processing derived assets...");
await makeLogoMark();
await makeFavicon();
for (const [src, out, dim] of CATS) await reuse(src, out, dim, 86);
for (const [src, out] of INSTA) await reuse(src, out, 800, 82);
console.log("Done.");
