const CACHE_NAME = 'lorem-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about',
  '/about.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  '/icon.png'
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

