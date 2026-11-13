// Cattura dal sito Fade servito su http://localhost:4177 (cartella fade-barber-studio/dist). Uso: node fade-contacts.cjs <uscita> …
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await p.goto('http://localhost:4177/', { waitUntil: 'networkidle' });
  await p.mouse.move(1439, 899);
  const top = await p.evaluate(() => { const c = document.querySelector('#contatti'); return c.getBoundingClientRect().top + scrollY; });
  // scorre a tappe per far partire le comparse
  for (let y = top - 1800; y <= top + 700; y += 300) { await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(250); }
  const shots = [['contatti-0', top + 40], ['contatti-1', top + 330], ['contatti-2', top + 1444 - 900 + 40]];
  for (const [n, y] of shots) {
    await p.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y);
    await p.waitForTimeout(2600);
    await p.screenshot({ path: `${out}/${n}.png` });
    const r = await p.evaluate(() => { const m = document.querySelector('#contatti iframe').getBoundingClientRect(); const bt = document.querySelector('[aria-label="Attiva la mappa interattiva"]')?.getBoundingClientRect(); return { m: [m.x, m.y, m.width, m.height].map(Math.round), bt: bt && [bt.x, bt.y, bt.width, bt.height].map(Math.round) }; });
    console.log(n, y, JSON.stringify(r));
  }
  await b.close();
})();
