const notificationBody = {
  body: 'PWA Sample notification.',
  icon: '/labo-round-icon-192x192.png'
}

self.addEventListener('install', async (event) => {
  console.log('install', event)
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

self.addEventListener('activate', async (event) => {
  console.log('activate', event)
  if (Notification.permission === 'granted') {
    await self.registration.showNotification('PWA Sample activate.', notificationBody)
  }
})

self.addEventListener('push', async (event) => {
  console.log('push', event)
  await self.registration.showNotification(event.data!.text(), notificationBody)
})
