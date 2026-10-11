// Cattura il sito (versione telefono, 390x844 a scala 2,5) per il Reel.
// Uso: node scripts/capture-site.mjs ../dist-single/index.html public
// Produce: site-hero.jpg, site-header.png, site-bar.png, site-full.jpg (pagina intera), site-metrics.json
// Richiede playwright-core (npm i -D playwright-core) e un Chromium (variabile CHROME o /opt/pw-browsers).
import { chromium } from "playwright-core";
import { execFileSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const [file, outArg = "public"] = process.argv.slice(2);
const out = path.resolve(outArg);
const DPR = 2.5;
const VW = 390;
const VH = 844;
const exe = process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const browser = await chromium.launch({
  executablePath: existsSync(exe) ? exe : undefined,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: DPR });
await page.goto("file://" + path.resolve(file));
await page.waitForTimeout(7600); // intro video + dissolvenza

// La mappa Google non si carica senza rete: al suo posto un'illustrazione scura con il segnaposto sull'indirizzo.
await page.evaluate(() => {
  const frame = document.querySelector("iframe");
  if (!frame) return;
  const r = frame.getBoundingClientRect();
  const roads = ["M-20 60 L420 140", "M-20 210 L420 170", "M60 -20 L140 420", "M250 -20 L210 420", "M-20 330 L420 280", "M330 -20 L390 420", "M-20 20 L200 420"]
    .map((d, i) => `<path d="${d}" stroke="${i % 3 ? "#3a3a44" : "#5a5a68"}" stroke-width="${i % 3 ? 7 : 12}" fill="none"/>`)
    .join("");
  const map = document.createElement("div");
  map.dataset.mapPlaceholder = "1";
  map.style.cssText = `height:${r.height}px;width:100%;position:relative;background:#16161b;overflow:hidden`;
  map.innerHTML = `<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;width:100%;height:100%">
      <rect x="150" y="190" width="120" height="70" rx="10" fill="#1f2b22"/>${roads}</svg>
    <div style="position:absolute;left:50%;top:46%;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center">
      <div style="background:#ffe600;color:#0b0b0b;font:700 12px 'Geist Variable',sans-serif;padding:6px 10px;border-radius:999px;white-space:nowrap;box-shadow:0 6px 18px rgba(0,0,0,.6)">Fade Barber Studio</div>
      <svg width="34" height="44" viewBox="0 0 24 32"><path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 32 12 32s12-11.5 12-20.3C24 5.2 18.6 0 12 0z" fill="#8a2be2"/><circle cx="12" cy="11.5" r="4.5" fill="#f5f5f2"/></svg>
    </div>`;
  frame.replaceWith(map);
});

await page.screenshot({ path: path.join(out, "site-hero.png") });
const viewport = await page.evaluate(() => {
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  };
  const bar = document.querySelector("div.fixed.bottom-0");
  return {
    header: document.querySelector("header nav").getBoundingClientRect().bottom,
    bar: box(bar),
    barBook: box([...bar.querySelectorAll("a")].pop()),
    heroBtn: box([...document.querySelectorAll("#top a")].find((a) => /Treatwell/.test(a.textContent))),
  };
});

// Fa comparire tutte le sezioni (animazioni all'ingresso) prima di catturarle.
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 300) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(90);
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await page.waitForTimeout(500);

const layout = await page.evaluate(() => {
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height };
  };
  const q = (s) => document.querySelector(s);
  const contact = q("#contatti");
  const links = [...contact.querySelectorAll("a")];
  return {
    pageHeight: document.body.scrollHeight,
    about: box(q("#chi-siamo")),
    certificate: box(q("#chi-siamo figure img")),
    aboutCard: box(q("#chi-siamo .glass")),
    tagli: box(q("#tagli")),
    cutsGrid: box(q("#tagli .grid")),
    servizi: box(q("#servizi")),
    contatti: box(contact),
    map: box(q("[data-map-placeholder]")),
    call: box(links.find((a) => a.href.startsWith("tel:"))),
    whatsapp: box(links.find((a) => a.href.includes("wa.me"))),
    hours: box(contact.querySelector("dl").closest(".glass")),
  };
});

// Pagina intera a pezzi da una schermata: Chromium non cattura immagini più alte di 16384 px.
await page.addStyleTag({ content: "header, div.fixed.bottom-0 { visibility: hidden !important }" });
const parts = [];
for (let y = 0, i = 0; y < total; y += VH, i++) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(150);
  const realY = await page.evaluate(() => scrollY);
  if (process.env.DEBUG) console.log("tile", i, y, realY);
  const tile = path.join(out, `tile-${i}.png`);
  await page.screenshot({ path: tile });
  const crop = path.join(out, `crop-${i}.png`);
  const take = Math.min(VH, total - y);
  execFileSync("convert", [tile, "-crop", `${VW * DPR}x${Math.round(take * DPR)}+0+${Math.round((y - realY) * DPR)}`, "+repage", crop]);
  rmSync(tile);
  parts.push(crop);
}
await browser.close();

execFileSync("convert", [...parts, "-append", "-quality", "88", path.join(out, "site-full.jpg")]);
parts.forEach((p) => rmSync(p));
const hero = path.join(out, "site-hero.png");
execFileSync("convert", [hero, "-quality", "90", path.join(out, "site-hero.jpg")]);
execFileSync("convert", [hero, "-crop", `${VW * DPR}x${Math.round(80 * DPR)}+0+0`, "+repage", path.join(out, "site-header.png")]);
execFileSync("convert", [hero, "-crop", `${VW * DPR}x${Math.round((VH - viewport.bar.y) * DPR)}+0+${Math.round(viewport.bar.y * DPR)}`, "+repage", path.join(out, "site-bar.png")]);
rmSync(hero);
writeFileSync(path.join(out, "site-metrics.json"), JSON.stringify({ dpr: DPR, viewport, ...layout }, null, 2));
console.log("ok", total);
