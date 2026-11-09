// Archery Lab Timer – service worker
// Άλλαξε το VERSION όταν θες να αναγκάσεις ανανέωση της cache.
const VERSION = 'v2';
const CACHE = 'archery-lab-timer-' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './fonts/fonts.css',
  './fonts/orbitron-latin-700-normal.woff2',
  './fonts/orbitron-latin-800-normal.woff2',
  './fonts/share-tech-mono-latin-400-normal.woff2',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('archery-lab-timer-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate για same-origin αιτήματα: άμεση απόκριση από cache,
// ενημέρωση στο παρασκήνιο όταν υπάρχει δίκτυο.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (cached) { e.waitUntil(network); return cached; }
      const res = await network;
      if (res) return res;
      if (req.mode === 'navigate') return cache.match('./index.html');
      return new Response('', { status: 504, statusText: 'Offline' });
    })
  );
});
