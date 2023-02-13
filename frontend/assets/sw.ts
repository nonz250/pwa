const serviceWorker = self as ServiceWorkerGlobalScope
const notificationBody = {
  body: 'PWA Sample notification.',
  icon: '/labo-round-icon-192x192.png'
}

serviceWorker.addEventListener('install', async (event) => {
  console.log('install', event)
})

serviceWorker.addEventListener('sync', async (event) => {
  console.log('sync', event)
})

serviceWorker.addEventListener('fetch', async (event) => {
  console.log('fetch', event)
  console.log(navigator.onLine)
})

serviceWorker.addEventListener('offline', async (event) => {
  console.log('offline', event)
})

serviceWorker.addEventListener('activate', async (event) => {
  console.log('activate', event)
  if (Notification.permission === 'granted') {
    await serviceWorker.registration.showNotification('PWA Sample activate.', notificationBody)
  }
})

serviceWorker.addEventListener('push', async (event) => {
  console.log('push', event)
  await serviceWorker.registration.showNotification(event.data.text(), notificationBody)
})
