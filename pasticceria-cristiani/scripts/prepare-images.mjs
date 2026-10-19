// Turns the shop's original photos into web-ready WebP files and writes src/data/images.json
// (size + blur placeholder). Usage: node scripts/prepare-images.mjs <folder with chat/, drive/, tripadvisor files>
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.argv[2];
if (!root) throw new Error("Pass the folder that holds the original photos");
const sources = JSON.parse(fs.readFileSync(new URL("./image-sources.json", import.meta.url)));
const outDir = new URL("../public/foto/", import.meta.url).pathname;
const manifest = {};

for (const [name, origin] of Object.entries(sources)) {
  const file = origin.startsWith("tripadvisor") ? "ta/pasticcini-da-the-13.jpg" : origin.split(" ")[0].replace(/^chat\//, "chat/").replace(/^drive\//, "drive/CRISTIANI/");
  let img = sharp(path.join(root, file)).rotate();
  if (name === "bancone") img = img.extract({ left: 0, top: 0, width: 2000, height: 1000 });
  const out = await img
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(path.join(outDir, `${name}.webp`));
  const blur = await sharp(path.join(outDir, `${name}.webp`)).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  manifest[name] = { src: `/foto/${name}.webp`, width: out.width, height: out.height, blur: `data:image/webp;base64,${blur.toString("base64")}`, origin };
  console.log(name, out.width, out.height, Math.round(out.size / 1024) + "KB");
}
fs.writeFileSync(new URL("../src/data/images.json", import.meta.url), JSON.stringify(manifest, null, 1));
