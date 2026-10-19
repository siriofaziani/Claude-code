// Turns the photos from the shop's Google Maps listing into web-ready WebP files and writes
// src/data/images.json (size, blur placeholder, source URL, who posted it).
// Usage: node scripts/prepare-images.mjs <folder with the originals, named <file>.jpg>
// The originals are the listing URLs from scripts/image-sources.json fetched with "=s0".
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.argv[2];
if (!root) throw new Error("Pass the folder that holds the original photos");
const sources = JSON.parse(fs.readFileSync(new URL("./image-sources.json", import.meta.url)));
const outDir = new URL("../public/foto/", import.meta.url).pathname;
fs.mkdirSync(outDir, { recursive: true });
const big = new Set(["facciata", "interno-bancone", "bancone", "bancone-arrivo", "vetrina-paste", "vetrina-torte"]);
const manifest = {};

for (const [name, s] of Object.entries(sources)) {
  const max = big.has(name) ? 2400 : 1600;
  const out = await sharp(path.join(root, `${s.file}.jpg`), { failOn: "none" })
    .rotate()
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outDir, `${name}.webp`));
  const blur = await sharp(path.join(outDir, `${name}.webp`)).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  manifest[name] = { src: `/foto/${name}.webp`, width: out.width, height: out.height, blur: `data:image/webp;base64,${blur.toString("base64")}`, by: s.by, source: s.url };
  console.log(name, out.width, out.height, Math.round(out.size / 1024) + "KB");
}
// The counter photo, warmed to the entrance clip's last frame, for the clip-to-photo hand-over.
if (manifest["bancone-arrivo"]) await warm(manifest);
fs.mkdirSync(new URL("../src/data/", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../src/data/images.json", import.meta.url), JSON.stringify(manifest, null, 1));

async function warm(manifest) {
  const from = path.join(outDir, "bancone-arrivo.webp");
  const to = path.join(outDir, "bancone-arrivo-caldo.webp");
  const out = await sharp(from).linear([1.103, 0.959, 0.848], [10, 5, -4]).webp({ quality: 82, effort: 5 }).toFile(to);
  manifest["bancone-arrivo-caldo"] = { ...manifest["bancone-arrivo"], src: "/foto/bancone-arrivo-caldo.webp", width: out.width, height: out.height, derived: "bancone-arrivo, warmed" };
}
