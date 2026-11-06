// Rendering del Reel promozionale: node scripts/render-promo.mjs            -> out/sito-reel.mp4
//                                   node scripts/render-promo.mjs --stills 40,120 -> out/promo-still-<f>.png
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "out");
mkdirSync(out, { recursive: true });
const candidates = [
  process.env.REMOTION_CHROME,
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell",
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
].filter(Boolean);
const browserExecutable = candidates.find((c) => existsSync(c));

const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.js") });
const composition = await selectComposition({ serveUrl, id: "SitoReel", browserExecutable });

const stillsArg = process.argv.indexOf("--stills");
if (stillsArg > -1) {
  for (const f of process.argv[stillsArg + 1].split(",").map(Number)) {
    await renderStill({ serveUrl, composition, frame: f, output: path.join(out, `promo-still-${f}.png`), browserExecutable });
    console.log("still", f);
  }
  process.exit(0);
}

const raw = path.join(out, "sito-reel-raw.mp4");
await renderMedia({
  serveUrl,
  composition,
  codec: "h264",
  crf: 17,
  pixelFormat: "yuv420p",
  audioCodec: "aac",
  outputLocation: raw,
  browserExecutable,
  concurrency: Number(process.env.CONCURRENCY || 4),
  onProgress: ({ progress }) => {
    if (Math.round(progress * 100) % 10 === 0) process.stdout.write(`\r${Math.round(progress * 100)}%   `);
  },
});
// Volume allo standard dei social (-14 LUFS, picco -1 dB), video copiato senza ricodifica.
const final = path.join(out, "sito-reel.mp4");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1:LRA=7",
  "-c:a", "aac", "-b:a", "320k", "-ar", "48000", "-movflags", "+faststart", final + ".tmp.mp4"]);
renameSync(final + ".tmp.mp4", final);
console.log("\n" + final);
