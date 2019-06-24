const CACHE = 'offline-1.0.5';


/**
 * Cache resources
 */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      cache.addAll(['/', '/favicon.ico']);
    })
  );
});


/**
 * Respond with cached resources
 */
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (request) {
      return request || fetch(event.request)
    })
  );
});


/**
 * Delete outdated cache
 */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      Promise.all(keys.map(function (key) {
        if (key !== CACHE) {
          return caches.delete(key)
        }
      }))
    })
  );
});