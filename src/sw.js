// Rutas de lo que se está cacheando
/*const staticAssets = [
    './',
    './style.css',
    './index.js',
    './bulma.min.css'
]*/

const staticAssets = [
    './',
    './app.js'
]

self.addEventListener('install', async event => {
    const cache = await caches.open('app-statics')
    cache.addAll(staticAssets)
})

self.addEventListener('fetch', event => {
    const req = event.request
    const url = new URL(req.url)

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        // event.respondWith(networkFirst(req))
    }

})

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req)
    return cachedResponse || fetch(req)
}