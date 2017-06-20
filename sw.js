this.addEventListener('install', function(event) {
    console.log('install');
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/pwa/',
        '/pwa/index.html',
        '/pwa/app.js',
        '/pwa/img/titre_text.png',
        '/pwa/img/lingots.png',
        '/pwa/img/gagnant.png',
        '/pwa/img/defaut.png',
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
    console.log('fetch : '+event.request.url);

  event.respondWith(caches.match(event.request).catch(function() {
      console.log('load');
    return fetch(event.request);
  }).then(function(response) {
    caches.open('v1').then(function(cache) {
      console.log('cache');
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
      console.log('erreur loading');
        return caches.match('/pwa/img/defaut.png');
  }));
});

