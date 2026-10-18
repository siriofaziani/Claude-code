// Converts the original photos downloaded from casaledelgallo.com into web-ready WebP files
// and writes src/data/images.json (size + blur placeholder for next/image).
// Usage: node scripts/prepare-images.mjs <folder with the original Wix files>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const srcDir = process.argv[2];
if (!srcDir) throw new Error("Pass the folder that holds the original images");
const sources = JSON.parse(fs.readFileSync(new URL("./image-sources.json", import.meta.url)));
const outDir = new URL("../public/images/", import.meta.url).pathname;
const manifest = {};

for (const [name, file] of Object.entries(sources)) {
  if (name === "logo-weathervane") continue;
  const input = sharp(path.join(srcDir, file)).rotate();
  const out = await input
    .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(outDir, `${name}.webp`));
  const blur = await sharp(path.join(srcDir, file)).rotate().resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  manifest[name] = {
    src: `/images/${name}.webp`,
    width: out.width,
    height: out.height,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
    original: `https://static.wixstatic.com/media/${file}`,
  };
  console.log(name, out.width, out.height, Math.round(out.size / 1024) + "KB");
}
fs.mkdirSync(new URL("../src/data/", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../src/data/images.json", import.meta.url), JSON.stringify(manifest, null, 1));
