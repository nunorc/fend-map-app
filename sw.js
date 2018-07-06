
self.addEventListener('install', function(event) {
  // service worker installed
})

// retrieve content from cache, do the actual request
// if cache not available, and cache it
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('map-app-1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})
