importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js")
workbox.precaching.precacheAndRoute(self.__precacheManifest || [])

const { strategies } = workbox
// Rutas de lo que se está cacheando
const staticAssets = [
    './'
]

self.addEventListener('install', async event => {
    const cache = await caches.open('app-statics')
    cache.addAll(staticAssets)
})

self.addEventListener('fetch', event => {
    const req = event.request
    const url = new URL(req.url)

    const cacheFirst = new strategies.CacheFirst();
    const networkFirst = new workbox.strategies.NetworkFirst()

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst.makeRequest({ request: event.request }))
    } else {
        event.respondWith(networkFirst.makeRequest({ request: event.request }))
    }

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
