// Cattura dal sito Fade servito su http://localhost:4177 (cartella fade-barber-studio/dist). Uso: node fade-map.cjs <uscita> …
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await p.goto('http://localhost:4177/', { waitUntil: 'networkidle' });
  await p.mouse.move(1439, 899);
  const top = await p.evaluate(() => { const c = document.querySelector('#contatti'); return c.getBoundingClientRect().top + scrollY; });
  for (let y = top - 1800; y <= top + 330; y += 300) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(250); }
  await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), top + 330);
  await p.waitForTimeout(2500);
  const box = await p.evaluate(() => { const r = document.querySelector('[aria-label="Attiva la mappa interattiva"]').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  console.log('box', box);
  await p.click('[aria-label="Attiva la mappa interattiva"]');
  await p.mouse.move(1439, 899);
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${out}/mappa-z0.png`, clip: box });
  for (let k = 1; k <= 2; k++) {
    await p.mouse.dblclick(720, 293);
    await p.mouse.move(1439, 899);
    await p.waitForTimeout(3500);
    await p.screenshot({ path: `${out}/mappa-z${k}.png`, clip: box });
  }
  await b.close();
})();
