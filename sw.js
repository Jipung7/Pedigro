/**
 * Pedigro - Service Worker for Offline-First PWA
 * Author: Jipung (Lone Steed Studio)
 * License: MIT
 */

const CACHE_NAME = 'pedigro-v2';
const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  './src/assets/css/tailwind.min.css',
  './src/assets/js/react.production.min.js',
  './src/assets/js/react-dom.production.min.js',
  './src/assets/js/app.bundle.js',
  './src/data/dictionaries/traits_chili.json',
  './src/data/dictionaries/traits_melon.json'
];

// Install Event: Pre-cache static assets and dictionaries
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Cache-First strategy with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Fallback for HTML navigation when completely offline
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
