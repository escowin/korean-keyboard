import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.css'
import './styles/keyboard.css'
import './styles/noteapp.css'

// Initialize the React app
const appElement = document.getElementById('app')
if (!appElement) {
  throw new Error('App element not found')
}

const root = ReactDOM.createRoot(appElement)
root.render(<App />)

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
        
        // Check for updates on every page load
        registration.update()
        
        // Listen for service worker updates
        registration.addEventListener('updatefound', () => {
          console.log('New service worker found, installing...')
          const newWorker = registration.installing
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker installed, refreshing page...')
                // New service worker is available, refresh the page
                window.location.reload()
              }
            })
          }
        })
        
        // Listen for service worker controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('Service worker controller changed')
          // Reload the page to get the latest version
          window.location.reload()
        })
        
        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'SW_ACTIVATED') {
            console.log('Service worker activated with version:', event.data.version)
          }
        })
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
