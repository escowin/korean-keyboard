// Service Worker for Korean Keyboard PWA
const CACHE_NAME = 'korean-keyboard-pwa-v1-0-0-1760316757431'
const CACHE_VERSION = 'korean-keyboard-pwa-v1-0-0-1760316757431'

// Cache strategies
const CACHE_STRATEGIES = {
  // Fonts - cache first with long-term storage
  FONTS: [
    '/fonts/ChironSungHK-VariableFont_wght.ttf',
    '/fonts/ChironSungHK-Italic-VariableFont_wght.ttf'
  ],
  // Static assets - cache first
  STATIC: [
    '/manifest.json',
    '/pwa-192x192.png',
    '/pwa-512x512.png',
    '/favicon.svg',
    '/apple-touch-icon.png'
  ],
  // App shell - stale while revalidate
  APP_SHELL: [
    '/',
    '/index.html'
  ],
  // Dynamic content - network first
  DYNAMIC: [
    '/api/'
  ]
}

// Install event - cache resources and skip waiting
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache:', CACHE_NAME)
        // Cache fonts first (highest priority)
        const fontPromises = CACHE_STRATEGIES.FONTS.map(url => 
          cache.add(url).catch(err => {
            console.warn('Failed to cache font:', url, err)
            return null
          })
        )
        
        // Cache static assets and app shell
        const otherUrls = [
          ...CACHE_STRATEGIES.STATIC,
          ...CACHE_STRATEGIES.APP_SHELL
        ]
        
        return Promise.all([
          Promise.all(fontPromises),
          cache.addAll(otherUrls)
        ])
      })
      .then(() => {
        console.log('Cache populated successfully, fonts cached with priority')
        // Skip waiting to activate immediately
        return self.skipWaiting()
      })
  )
})

// Fetch event - implement stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  
  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        // For fonts, use cache-first strategy (fonts rarely change)
        if (CACHE_STRATEGIES.FONTS.some(path => url.pathname === path)) {
          if (cachedResponse) {
            console.log('Font served from cache:', url.pathname)
            return cachedResponse
          }
          // If not in cache, fetch and cache
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
              console.log('Font cached for future use:', url.pathname)
            }
            return networkResponse
          })
        }
        
        // For app shell and static assets, use stale-while-revalidate
        if (CACHE_STRATEGIES.APP_SHELL.some(path => url.pathname === path) ||
            CACHE_STRATEGIES.STATIC.some(path => url.pathname === path)) {
          
          const fetchPromise = fetch(request).then((networkResponse) => {
            // Update cache with fresh response
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch(() => {
            // Network failed, return cached version if available
            return cachedResponse
          })
          
          // Return cached version immediately, update in background
          return cachedResponse || fetchPromise
        }
        
        // For dynamic content, use network-first
        if (CACHE_STRATEGIES.DYNAMIC.some(path => url.pathname.startsWith(path))) {
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch(() => {
            return cachedResponse
          })
        }
        
        // Default: cache first, network fallback
        return cachedResponse || fetch(request).then((networkResponse) => {
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone())
          }
          return networkResponse
        })
      })
    })
  )
})

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Claim all clients immediately
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker activated successfully')
      // Notify all clients about the update
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SW_ACTIVATED',
            version: CACHE_VERSION
          })
        })
      })
    })
  )
})

// Handle background sync for offline note saving
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  // Handle offline note synchronization
  return Promise.resolve()
}

// Handle push notifications (for future features)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow('/')
  )
})
