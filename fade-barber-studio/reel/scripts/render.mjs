// Rendering del Reel: node scripts/render.mjs            -> out/fade-reel.mp4 (1080x1920, H.264, 30 fps)
//                     node scripts/render.mjs --stills 30,150,300 -> out/still-<frame>.png per controllo
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "out");
mkdirSync(out, { recursive: true });

// In questo ambiente usiamo il Chromium già installato; altrove Remotion scarica il suo.
const localChrome = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const browserExecutable = process.env.REMOTION_CHROME || (existsSync(localChrome) ? localChrome : undefined);

// Logo PIXELNOIR: se esiste public/pixelnoir-logo.png lo usa, altrimenti un segnaposto tipografico.
const inputProps = { hasLogo: existsSync(path.join(root, "public/pixelnoir-logo.png")) };
console.log("logo PIXELNOIR:", inputProps.hasLogo ? "file" : "segnaposto");

const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.js") });
const composition = await selectComposition({ serveUrl, id: "FadeReel", browserExecutable, inputProps });

const stillsArg = process.argv.indexOf("--stills");
if (stillsArg > -1) {
  for (const f of process.argv[stillsArg + 1].split(",").map(Number)) {
    await renderStill({ serveUrl, composition, frame: f, output: path.join(out, `still-${f}.png`), browserExecutable, inputProps });
    console.log("still", f);
  }
  process.exit(0);
}

const raw = path.join(out, "fade-reel-raw.mp4");
await renderMedia({
  serveUrl,
  composition,
  codec: "h264",
  crf: 18,
  pixelFormat: "yuv420p",
  audioCodec: "aac",
  outputLocation: raw,
  inputProps,
  browserExecutable,
  concurrency: Number(process.env.CONCURRENCY || 4),
  onProgress: ({ progress }) => {
    if (Math.round(progress * 100) % 10 === 0) process.stdout.write(`\r${Math.round(progress * 100)}%   `);
  },
});

// Volume allo standard dei social (-14 LUFS, picco -1 dB), video copiato senza ricodifica.
const final = path.join(out, "fade-reel.mp4");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-c:v", "copy", "-af", "loudnorm=I=-14:TP=-1:LRA=7",
  "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", final + ".tmp.mp4"]);
renameSync(final + ".tmp.mp4", final);
console.log("\n" + final);
