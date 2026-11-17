/* Flavia Med · Service Worker
   App shell in cache all'installazione (apertura istantanea e offline), pagine e file locali
   in «stale-while-revalidate», Google Fonts in cache-first.
   Dopo ogni modifica dell'app aumenta VERSION: comparirà l'avviso «Nuova versione disponibile». */
const VERSION = 'fm-v1.0.0';
const SHELL_CACHE = `${VERSION}-shell`, RUNTIME_CACHE = `${VERSION}-runtime`;
const SHELL = ['./', './index.html', './manifest.json', './vendor/chart.umd.js', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/icon-maskable-192.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];
const CDN = ['fonts.googleapis.com', 'fonts.gstatic.com'];
self.addEventListener('install', e => e.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, {cache:'reload'}))))));
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) if (!k.startsWith(VERSION)) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener('message', e => { if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting(); });
const usable = r => r && (r.ok || r.type === 'opaque');
async function swr(event, cacheName, key){
  const cache = await caches.open(cacheName), cached = await cache.match(key || event.request, {ignoreSearch:true});
  const net = fetch(event.request).then(r => { if (usable(r)) cache.put(key || event.request, r.clone()); return r; }).catch(() => null);
  if (cached){ event.waitUntil(net); return cached; }
  return (await net) || Response.error();
}
self.addEventListener('fetch', event => {
  const req = event.request; if (req.method !== 'GET') return;
  const url = new URL(req.url), scope = new URL(self.registration.scope).pathname;
  if (req.mode === 'navigate' && url.origin === location.origin && (url.pathname === scope || url.pathname === scope + 'index.html')){
    event.respondWith(swr(event, SHELL_CACHE, './index.html').then(r => r.type === 'error' ? caches.match('./index.html') : r)); return;
  }
  if (url.origin === location.origin){ event.respondWith(swr(event, SHELL_CACHE)); return; }
  if (CDN.includes(url.hostname)) event.respondWith((async () => {
    const c = await caches.open(RUNTIME_CACHE), hit = await c.match(req); if (hit) return hit;
    try { const r = await fetch(req); if (usable(r)) c.put(req, r.clone()); return r; } catch(e){ return Response.error(); }
  })());
});
