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
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
