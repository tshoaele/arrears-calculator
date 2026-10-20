const CACHE_NAME = 'arrears-calc-v1';

// List all files that need to be cached for the app to work offline
const ASSETS_TO_CACHE = [
  '/arrears-calculator/',
  '/arrears-calculator/index.html',
  '/arrears-calculator/manifest.json',
  '/arrears-calculator/icon-192.png',
  '/arrears-calculator/icon-512.png',
  '/arrears-calculator/apple-touch-icon.png'
];

// Install event: cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches if you update the CACHE_NAME later
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: serve cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if found, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});
