// Cattura dal sito Fade servito su http://localhost:4177 (cartella fade-barber-studio/dist). Uso: node fade-hero-clip.cjs <uscita> …
// Registra l'intro a scorrimento del sito Fade (video originale + testi), fotogramma per fotogramma.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
(async () => {
  const [out, durS, fpsS] = process.argv.slice(2);
  const DUR = Number(durS), FPS = Number(fpsS);
  const N = Math.round(DUR * FPS);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  await p.goto('http://localhost:4177/', { waitUntil: 'networkidle' });
  await p.mouse.move(1439, 899);
  await p.waitForTimeout(2500);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-g', '12', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const ease = (k) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, k)));
  const A = 0.5, Z = DUR - 0.38;
  let slow = 0;
  for (let i = 0; i < N; i++) {
    const u = i / FPS;
    const prog = ease((u - A) / (Z - A));
    const ok = await p.evaluate(async (prog) => {
      const v = document.querySelector('#top video');
      const sec = document.querySelector('#top');
      const range = sec.offsetHeight - innerHeight;
      window.scrollTo({ top: Math.round(prog * range), behavior: 'instant' });
      const want = Math.min(0.999, Math.min(1, prog / 0.8)) * v.duration;
      return await new Promise((res) => {
        const t0 = performance.now();
        const chk = () => {
          const done = !v.seeking && v.readyState >= 2 && Math.abs(v.currentTime - want) < 0.012;
          if (done || performance.now() - t0 > 4000) requestAnimationFrame(() => requestAnimationFrame(() => res(done)));
          else requestAnimationFrame(chk);
        };
        chk();
      });
    }, prog);
    if (!ok) slow++;
    const buf = await p.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 30 === 0) process.stdout.write(`\r${i}/${N}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('\nfatto, attese scadute:', slow);
  await b.close();
})();
