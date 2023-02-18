const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
    const r = (new Date().getTime() + Math.random() * 16) % 16 | 0; const v = a === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const NOTIFICATION_BODY = {
  body: 'PWA Sample notification.',
  icon: '/labo-round-icon-192x192.png'
}

const CACHE_VERSION = uuid()
const CACHE_NAME = `pwa-sample-cache-v-${CACHE_VERSION}`
const CURRENT_CACHES = {
  main: CACHE_NAME
}
const MAIN_CACHES: string[] = [
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
    console.log('notification permission is', Notification.permission)
    if (Notification.permission === 'granted') {
      await self.registration.showNotification('New PWA Sample activate.', NOTIFICATION_BODY)
    }
  }

  const updateCaches = async (): Promise<void> => {
    // @see https://developer.mozilla.org/ja/docs/Web/API/Cache
    const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES))
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames.map(async (cacheName): Promise<Promise<boolean> | Promise<void>> => {
        if (!expectedCacheNamesSet.has(cacheName)) {
          console.log(`Update caches ${cacheName} to ${CACHE_NAME}`)
          return await caches.delete(cacheName)
        }
      })
    )
  }

  event.waitUntil((async () => {
    await updateCaches()
    void notificationActivate()
  })())
})

self.addEventListener('sync', (event) => {
  console.log('sync', event)
})

self.addEventListener('fetch', (event) => {
  console.log('fetch', event)
  event.respondWith((async () => {
    const cacheResponse = await caches.match(event.request)
    if (cacheResponse !== null && cacheResponse !== undefined) {
      console.log('Cache resource:', event.request.url)
      return cacheResponse
    }

    console.log('Server resource:', event.request.url)
    const response = await fetch(event.request)
    const cache = await caches.open(CACHE_NAME)
    await cache.put(event.request, response.clone())
    return response
  })())
})

self.addEventListener('push', (event) => {
  console.log('push', event)
  event.waitUntil((async () => {
    if (event.data !== null) {
      await self.registration.showNotification(event.data.text(), NOTIFICATION_BODY)
    }
  })())
})
