console.log(
  '%cThis is pwa sample page for nonz250 learn.',
  'padding: 0.2rem; border-radius: 5px; color: white; background-color: #3d50b7;'
)

console.log(
  'You can refer to it if you like.\n%chttps://github.com/nonz250/pwa',
  'padding: 0.2rem 0; border-radius: 5px; font-weight: 700; font-size: 0.8rem;'
)

window.onload = async () => {
  if (!('serviceWorker' in navigator)) {
    console.error('Service worker is disabled.')
  }

  try {
    const registration = await navigator
      .serviceWorker
      .register('/sw.js')
    await registration.update()
  } catch (error) {
    console.error(error)
  }

  document.getElementById('notification')?.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    void Notification.requestPermission().then(result => {
      if (result === 'granted') {
        const notification = new Notification('Dummy notification.', {
          body: 'PWA Sample notification.',
          icon: '/labo-round-icon-192x192.png'
        })
        console.log(notification)
      }
    })
  })
}
