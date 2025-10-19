# Font Caching for Offline PWA Access

## Overview

This document explains how the Korean font (ChironSungHK) is cached to ensure it loads correctly when the PWA is accessed offline.

## Changes Made

### 1. Vite PWA Configuration (`vite.config.ts`)

- **Added font to includeAssets**: The font file is now explicitly included in the PWA assets
- **Extended globPatterns**: Added support for font file extensions (`.ttf`, `.woff`, `.woff2`)
- **Added runtime caching**: Configured Workbox to cache font files with a 1-year expiration

```typescript
VitePWA({
  includeAssets: ['fonts/ChironSungHK-VariableFont_wght.ttf'],
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,woff,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /\.(?:ttf|woff|woff2)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
          }
        }
      }
    ]
  }
})
```

### 2. Service Worker (`public/sw.js`)

- **Fixed font paths**: Updated to use correct base path `/korean-keyboard/fonts/`
- **Removed non-existent font**: Removed reference to italic variant that doesn't exist
- **Enhanced font detection**: Added logic to catch any font file requests by extension
- **Improved error handling**: Added fallback responses for failed font requests

### 3. CSS Font Declaration (`src/styles/main.css`)

- **Updated font path**: Changed from relative `./fonts/` to absolute `/korean-keyboard/fonts/`
- **Maintained font-display: block**: Ensures consistent rendering for Korean characters

### 4. HTML Preloading (`index.html`)

- **Updated preload href**: Changed to use absolute path with base URL
- **Updated FontFace API**: Updated JavaScript font loading to use correct path

## How It Works

1. **Initial Load**: Font is preloaded in HTML and cached by the service worker
2. **Offline Access**: Service worker serves the cached font file when network is unavailable
3. **Cache Strategy**: Uses "Cache First" strategy - serves from cache immediately, updates in background
4. **Long-term Storage**: Fonts are cached for 1 year to minimize network requests

## Testing Offline Font Loading

1. Build the project: `npm run build`
2. Open the PWA in your browser
3. Open DevTools → Network tab
4. Check "Offline" checkbox to simulate offline mode
5. Refresh the page
6. Verify that Korean text displays correctly with the custom font

## File Structure

```
public/
├── fonts/
│   └── ChironSungHK-VariableFont_wght.ttf (47MB)
└── sw.js (service worker with font caching)

src/styles/
└── main.css (@font-face declaration)

index.html (font preloading)
vite.config.ts (PWA configuration)
```

## Troubleshooting

If fonts don't load offline:

1. Check browser console for service worker errors
2. Verify font file exists in `public/fonts/`
3. Check that service worker is registered and active
4. Clear browser cache and reload
5. Run the test script: `node scripts/test-font-caching.js`

## Performance Notes

- Font file is 47MB, so initial load may take time
- Font is cached for 1 year to minimize re-downloads
- Uses `font-display: block` for consistent Korean character rendering
- Preloading ensures font is available as soon as possible
