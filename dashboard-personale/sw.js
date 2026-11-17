/* Quartier Generale · Service Worker
   Strategia:
   - App shell (HTML, manifest, icone, Chart.js) precaricata all'installazione → apertura istantanea e offline.
   - Pagina e file locali: "stale-while-revalidate" (risponde subito dalla cache, aggiorna in background).
   - Google Fonts: cache-first (una volta scaricati restano disponibili offline).
   Quando modifichi l'app, aumenta VERSION: comparirà l'avviso "Nuova versione disponibile". */
const VERSION = 'qg-v3.2.0';
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './vendor/chart.umd.js',
  './pillole.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
];
const CDN_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => cache.addAll(SHELL.map(url => new Request(url, { cache: 'reload' }))))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k)));
    if (self.registration.navigationPreload) await self.registration.navigationPreload.disable().catch(() => {});
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

const usable = res => res && (res.ok || res.type === 'opaque');

async function staleWhileRevalidate(event, cacheName, cacheKey) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(cacheKey || event.request, { ignoreSearch: true });
  const network = fetch(event.request)
    .then(res => { if (usable(res)) cache.put(cacheKey || event.request, res.clone()); return res; })
    .catch(() => null);
  if (cached) { event.waitUntil(network); return cached; }
  const res = await network;
  return res || Response.error();
}

async function cacheFirst(event) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(event.request);
  if (cached) return cached;
  try {
    const res = await fetch(event.request);
    if (usable(res)) cache.put(event.request, res.clone());
    return res;
  } catch (e) {
    return Response.error();
  }
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Navigazione dentro l'app: sempre la shell (gli hash #crm, #stats… li gestisce il router)
  const scopePath = new URL(self.registration.scope).pathname;
  const isShell = url.pathname === scopePath || url.pathname === scopePath + 'index.html';
  if (req.mode === 'navigate' && url.origin === self.location.origin && isShell) {
    event.respondWith((async () => {
      const res = await staleWhileRevalidate(event, SHELL_CACHE, './index.html');
      if (res && res.type !== 'error') return res;
      const fallback = await caches.match('./index.html');
      return fallback || new Response('<!doctype html><meta charset="utf-8"><body style="background:#070708;color:#efede7;font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0">Offline: apri l\'app una volta con la connessione attiva.</body>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(event, SHELL_CACHE));
    return;
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(event));
  }
});
