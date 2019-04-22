// importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js")
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

const { strategies } = workbox
// Rutas de lo que se está cacheando
const staticAssets = [
    './'
]

self.addEventListener('install', async event => {
    /*const cache = await caches.open('app-statics')
    cache.addAll(staticAssets)*/
})

self.addEventListener('fetch', event => {
    const req = event.request
    const url = new URL(req.url)

    /*console.log("[SW] Mostrando cosas del fetch")
    console.log(req)
    console.log(url)*/

    // const cacheFirst = new strategies.CacheFirst();
    // const networkFirst = new workbox.strategies.NetworkFirst()

    /*
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst.makeRequest({ request: event.request }))
    } else {
        event.respondWith(networkFirst.makeRequest({ request: event.request }))
    }*/

})

/*

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req)
    return cachedResponse || fetch(req)
}

async function networkFirst(req) {
    const cache = await caches.open('app-dynamic')

    try {
        const res = await fetch(req)
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }

}*/

/*
workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.NetworkFirst()
)

//Index.html
workbox.routing.registerRoute(
    new RegExp(''),
    new workbox.strategies.NetworkFirst()
);*/

// Cache para peticiones desde la API de rails
workbox.routing.registerRoute(
    // Cache image files.
    new RegExp("http:\/\/192\.168\.0\.30:3000.*"),
    // Use the cache if it's available.
    new workbox.strategies.NetworkFirst({
        // Use a custom cache name.
        cacheName: 'api-request-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images.
                maxEntries: 10,
                // Cache for a maximum of a day.
                maxAgeSeconds: 24 * 60 * 60,
            })
        ],
    })
);

// Cache para el html que se pide, en este caso sólo el home
workbox.routing.registerRoute(
    new RegExp('\/$'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'statics-cache'
    })
)

// Cache para el js, en particular solo el de los estilos
workbox.routing.registerRoute(
    new RegExp('.*styles\.js$'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'js-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images.
                maxEntries: 10,
                // Cache for a maximum of a day.
                maxAgeSeconds: 24 * 60 * 60,
            })
        ],
    })
)

workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images.
                maxEntries: 20,
                // Cache for a maximum of a week.
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);