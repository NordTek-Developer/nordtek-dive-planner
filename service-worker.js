const CACHE_NAME = 'nordtek-cache-v1.6.1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json?v=1.6.1',
  '/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        APP_SHELL.map(asset => cache.add(new Request(asset, { cache: 'reload' })))
      )
    )
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('nordtek-cache-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (new URL(request.url).origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirstPage(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    if (response && response.ok) {
      await cache.put('/index.html', response.clone());
    }

    return response;
  } catch (error) {
    return (await cache.match('/index.html')) || Response.error();
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then(response => {
      if (response && response.ok) {
        cache.put(request, response.clone());
      }

      return response;
    })
    .catch(() => null);

  return cached || networkPromise || Response.error();
}
