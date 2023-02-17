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
  '/dist/index.js'
]

self.addEventListener('install', (event) => {
  console.log('install', event)
  const addAllCache = async (): Promise<void> => {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(MAIN_CACHES)
  }
  event.waitUntil(addAllCache())
})

self.addEventListener('activate', (event) => {
  console.log('activate', event)

  const notificationActivate = async (): Promise<void> => {
    if (Notification.permission === 'granted') {
      await self.registration.showNotification('New PWA Sample activate.', notificationBody)
    }
  }

  const updateCaches = async (): Promise<void> => {
    // @see https://developer.mozilla.org/ja/docs/Web/API/Cache
    const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES))
    void caches.keys().then(async (cacheNames) =>
      await Promise.all(
        cacheNames.map(async (cacheName): Promise<Promise<boolean> | Promise<void>> => {
          if (!expectedCacheNamesSet.has(cacheName)) {
            console.log(`Update caches ${cacheName} to ${CACHE_NAME}`)
            return await caches.delete(cacheName)
          }
        })
      )
    )
  }

  const activate = async (): Promise<void> => {
    await updateCaches()
    await notificationActivate()
  }

  void activate()
})

self.addEventListener('sync', (event) => {
  console.log('sync', event)
})

self.addEventListener('fetch', (event) => {
  console.log('fetch', event)
  console.log(navigator.onLine)
})

self.addEventListener('offline', (event) => {
  console.log('offline', event)
})

self.addEventListener('push', (event) => {
  console.log('push', event)
  if (event.data !== null) {
    void self.registration.showNotification(event.data.text(), notificationBody)
  }
})
