const CACHE_NAME = 'v1_cafeteria';
const contentToCache = [
  "/",
  "index.html",
  "css/style.css",
  "js/app.js",
  "images/coffee1.jpg",
  "images/coffee2.jpg",
  "images/coffee3.jpg",
  "images/coffee4.jpg",
  "images/coffee5.jpg",
  "images/coffee6.jpg",
  "images/coffee7.jpg",
  "images/coffee8.jpg",
  "images/coffee9.jpg"
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
          console.log('[Servicio Worker] Almacena todo en caché: contenido e intérprete de la aplicación');
      return cache.addAll(contentToCache);
    })
    .catch(err => console.log('Falló registro de cache', err))
  );
});

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//Encuentra recurso en la caché y si no lo vuelve a solicitar a la red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Servicio Worker] Obteniendo recurso: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
          console.log('[Servicio Worker] Almacena el nuevo recurso: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});