/**
 * Esporta il reel in MP4 1080×1920, fotogramma per fotogramma (nessun fotogramma perso, ritmo esatto).
 *
 *   npm run build && npm run export            → out/fade-reel.mp4 (60 fps)
 *   FPS=30 npm run export                      → versione a 30 fps
 *
 * Serve la cartella dist/, apre la pagina con ?export, imposta il tempo di ogni fotogramma con
 * window.__reel.setTime(s), cattura lo schermo e passa i fotogrammi a ffmpeg insieme a public/beat.wav.
 * Richiede ffmpeg e Playwright (npm i -D playwright, oppure installato globalmente).
 */
import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, join, resolve } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = resolve(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const OUT = join(ROOT, "out");
const FPS = Number(process.env.FPS || 60);
const FILE = join(OUT, process.env.OUT || (FPS === 60 ? "fade-reel.mp4" : `fade-reel-${FPS}fps.mp4`));

if (!existsSync(join(DIST, "index.html"))) {
  console.error("Manca dist/: esegui prima `npm run build`.");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".mp3": "audio/mpeg", ".woff2": "font/woff2", ".wav": "audio/wav" };
const server = createServer((req, res) => {
  const path = join(DIST, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = existsSync(path) && statSync(path).isFile() ? path : join(DIST, "index.html");
  res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const url = `http://localhost:${server.address().port}/?export`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.error("pagina:", e.message));
await page.goto(url);
await page.waitForFunction(() => window.__reel);
await page.evaluate(() => window.__reel.ready);
const duration = await page.evaluate(() => window.__reel.duration);
const frames = Math.round(duration * FPS);
const cdp = await page.context().newCDPSession(page);

const ff = spawn(
  "ffmpeg",
  [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-i", join(ROOT, "public", "beat.wav"),
    "-map", "0:v", "-map", "1:a",
    "-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-r", String(FPS), "-g", String(FPS * 2), "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
    "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
    "-t", duration.toFixed(3), "-movflags", "+faststart",
    FILE,
  ],
  { stdio: ["pipe", "inherit", "inherit"] },
);

const t0 = Date.now();
for (let i = 0; i < frames; i++) {
  await page.evaluate((s) => window.__reel.setTime(s), i / FPS);
  const { data } = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 94, optimizeForSpeed: true });
  if (!ff.stdin.write(Buffer.from(data, "base64"))) await new Promise((r) => ff.stdin.once("drain", r));
  if (i % FPS === 0) process.stdout.write(`\r${i}/${frames} fotogrammi · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await browser.close();
server.close();
console.log(`\nFatto: ${FILE}`);
