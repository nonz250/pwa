const notificationBody = {
  body: 'PWA Sample notification.',
  icon: '/labo-round-icon-192x192.png'
}

const CACHE_VERSION = 1
const CACHE_NAME = `pwa-sample-cache-v${CACHE_VERSION}`
const CURRENT_CACHES = {
  main: CACHE_NAME
}
const MAIN_CACHES = [
  '/',
  '/dist/index.js',
]

self.addEventListener('install', async (event) => {
  console.log('install', event)
  caches.open(CACHE_NAME).then(cache => {
    cache.addAll(MAIN_CACHES)
  })
})

self.addEventListener('activate', async (event) => {
  console.log('activate', event)
  if (Notification.permission === 'granted') {
    await self.registration.showNotification('New PWA Sample activate.', notificationBody)
  }
  // @see https://developer.mozilla.org/ja/docs/Web/API/Cache
  const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  caches.keys().then((cacheNames) =>
    Promise.all(
      cacheNames.map((cacheName) => {
        if (!expectedCacheNamesSet.has(cacheName)) {
          console.log(`Update caches ${cacheName} to ${CACHE_NAME}`);
          return caches.delete(cacheName);
        }
      })
    )
  );
})

self.addEventListener('sync', async (event) => {
  console.log('sync', event)
})

self.addEventListener('fetch', async (event) => {
  console.log('fetch', event)
  console.log(navigator.onLine)
})

self.addEventListener('offline', async (event) => {
  console.log('offline', event)
})

self.addEventListener('push', async (event) => {
  console.log('push', event)
  await self.registration.showNotification(event.data!.text(), notificationBody)
})
