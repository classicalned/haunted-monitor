self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  clients.claim();
});

// Minimal fetch handler to satisfy Chrome’s PWA requirement
self.addEventListener("fetch", () => { });
