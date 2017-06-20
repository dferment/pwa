this.addEventListener('install', function(event) {
    console.log('install');
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/~didier/pwa1/',
        '/~didier/pwa1/index.html',
        '/~didier/pwa1/app.js',
        '/~didier/pwa1/img/titre_text.png',
        '/~didier/pwa1/img/lingots.png',
        '/~didier/pwa1/img/gagnant.png',
        '/~didier/pwa1/img/defaut.png',
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
        return caches.match('/~didier/pwa1/img/defaut.png');
  }));
});

