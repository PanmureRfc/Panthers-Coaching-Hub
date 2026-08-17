/* Caches the app so it opens on a cold pitch with no signal.
   Bump CACHE when you change any file, or phones keep the old version. */
const CACHE = "panthers-v14";
const FILES = ["./", "./index.html", "./app.js", "./storage.js", "./config.js", "./manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  if (e.request.url.includes("/rest/v1/")) return;   // never cache Supabase

  // Always try the network first, so an update is picked up straight away.
  // Fall back to the cache only when there's no signal.
  e.respondWith(
    fetch(e.request).then((r) => {
      const copy = r.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request))
  );
});
