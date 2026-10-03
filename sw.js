self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker ativo");
});

self.addEventListener("fetch", (event) => {
  event.respondWirth(fetch(event.request));
});