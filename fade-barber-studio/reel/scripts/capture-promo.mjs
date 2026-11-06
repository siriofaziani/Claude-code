// Cattura le schermate del sito per il Reel promozionale "SitoReel".
// Uso: node scripts/capture-promo.mjs http://localhost:4177/ public/promo
// Telefono 390x844 a scala 2 (780x1688), computer 1440x900 a scala 1.
import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const [url = "http://localhost:4177/", outArg = "public/promo"] = process.argv.slice(2);
const out = path.resolve(outArg);
mkdirSync(out, { recursive: true });
const exe = process.env.CHROME || "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome";
const browser = await chromium.launch({ executablePath: existsSync(exe) ? exe : undefined });

const wait = (p, ms) => p.waitForTimeout(ms);
const shot = (p, name) => p.screenshot({ path: path.join(out, name), type: "jpeg", quality: 92 });
const top = (p, sel) => p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
const to = (p, y) => p.evaluate((v) => scrollTo(0, v), y);

// Il video d'ingresso ha la filigrana del generatore in basso a destra: lo ingrandiamo un poco
// verso l'alto a sinistra perché quell'angolo esca dall'inquadratura.
const HIDE_WATERMARK = `#top video, #top img { transform: scale(1.12); transform-origin: 30% 25%; }`;

async function revealAll(p) {
  const H = await p.evaluate(() => document.body.scrollHeight);
  for (let v = 0; v < H; v += 500) {
    await to(p, v);
    await wait(p, 40);
  }
}

/* ───────────── telefono ───────────── */
{
  const p = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: HIDE_WATERMARK });
  await wait(p, 1500);

  // ingresso a scorrimento: 5 posizioni del video
  const heroH = await p.evaluate(() => document.querySelector("#top").offsetHeight - innerHeight);
  for (const [i, k] of [0, 0.22, 0.45, 0.7, 1].entries()) {
    await to(p, Math.round(heroH * k));
    await wait(p, 1600);
    await shot(p, `m-hero-${i}.jpg`);
  }

  await revealAll(p);

  // schermate per il telefono che scorre nel finale
  const stack = [
    ["#top", "m-s0.jpg", (h) => h - 40],
    ['section[aria-label="Il nostro manifesto"]', "m-s1.jpg", () => 0],
    ["#chi-siamo", "m-s2.jpg", () => 0],
    ["#tagli", "m-s3.jpg", () => 120],
    ["#servizi", "m-s4.jpg", () => 560],
    ["#prenota", "m-s5.jpg", () => 0],
    ["#recensioni", "m-s6.jpg", () => 0],
    ["#contatti", "m-s7.jpg", () => 120],
  ];
  for (const [sel, name, off] of stack) {
    const y = sel === "#top" ? off(heroH) : (await top(p, sel)) + off();
    await to(p, y);
    await wait(p, 1300);
    await shot(p, name);
  }

  // carosello dei tagli: prima carta e seconda (bordo dorato)
  const track = 'ul[aria-label="Galleria dei tagli"]';
  await to(p, (await top(p, track)) - 120);
  await wait(p, 1200);
  await shot(p, "m-cuts-0.jpg");
  await p.locator(track).evaluate((t) => t.scrollTo({ left: t.firstElementChild.getBoundingClientRect().width + 24 }));
  await wait(p, 1000);
  await shot(p, "m-cuts-1.jpg");

  // prenotazione: servizio → barbiere → fascia → riepilogo
  const book = async (sel, offset, name, action) => {
    await to(p, (await top(p, sel)) - offset);
    await wait(p, 700);
    if (action) {
      await action();
      await wait(p, 650);
    }
    await shot(p, name);
  };
  await book('[aria-label="Servizio"]', 260, "m-book-0.jpg");
  const tap = async (re, name) => {
    const el = p.getByRole("radio", { name: re });
    const bb = await el.boundingBox();
    await el.tap();
    return bb;
  };
  const taps = {};
  await book('[aria-label="Servizio"]', 260, "m-book-1.jpg", async () => (taps.service = await tap(/Taglio e Barba\s*1 ora/)));
  await book('[aria-label="Barbiere"]', 260, "m-book-2.jpg", async () => (taps.barber = await tap(/David/)));
  await book('[aria-label="Fascia oraria"]', 300, "m-book-3.jpg", async () => (taps.slot = await tap(/Primo Pomeriggio/)));
  const summary = p.locator("#prenota a", { hasText: "Invia su WhatsApp" });
  await to(p, (await summary.evaluate((e) => e.getBoundingClientRect().top + scrollY)) - 560);
  await wait(p, 900);
  taps.send = await summary.boundingBox();
  await shot(p, "m-book-4.jpg");
  const message = decodeURIComponent((await summary.getAttribute("href")).split("text=")[1]);

  // recensioni: riquadro 5.0 e prima scheda
  await to(p, (await top(p, "#recensioni")) + 40);
  await wait(p, 1300);
  await shot(p, "m-reviews.jpg");

  console.log(JSON.stringify({ taps, message }, null, 2));
  await p.close();
}

/* ───────────── computer ───────────── */
{
  const p = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: HIDE_WATERMARK });
  await wait(p, 1500);
  const heroH = await p.evaluate(() => document.querySelector("#top").offsetHeight - innerHeight);
  await to(p, heroH);
  await wait(p, 1800);
  await shot(p, "d-hero.jpg");
  await revealAll(p);

  // carte dei tagli con il mouse sopra (inclinazione 3D e bordo giallo)
  const track = 'ul[aria-label="Galleria dei tagli"]';
  await to(p, (await top(p, track)) - 60);
  await wait(p, 1200);
  for (const [i, [card, fx, fy]] of [[1, 0.75, 0.3], [2, 0.3, 0.65]].entries()) {
    const bb = await p.locator(`${track} > li`).nth(card).boundingBox();
    await p.mouse.move(bb.x + bb.width * fx, bb.y + bb.height * fy, { steps: 10 });
    await wait(p, 900);
    await shot(p, `d-cuts-${i}.jpg`);
  }
  // listino con una scheda "accesa"
  const grid = "#servizi ul";
  await to(p, (await top(p, grid)) - 80);
  await wait(p, 1200);
  const sb = await p.locator(`${grid} li`).nth(4).boundingBox();
  await p.mouse.move(sb.x + sb.width * 0.6, sb.y + sb.height * 0.5, { steps: 10 });
  await wait(p, 900);
  await shot(p, "d-services.jpg");
  await p.close();
}

await browser.close();
