// Minimal SW to satisfy installability. We don't cache the videos to keep it simple.
const CACHE_NAME = "hm-static-v1";
const CORE_ASSETS = [
  "/haunted-monitor/",
  "/haunted-monitor/index.html",
  "/haunted-monitor/style.css",
  "/haunted-monitor/manifest.json",
  "/haunted-monitor/letters/A.png" // prove path works; we don't need every letter
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Required fetch handler — network-first for everything.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});