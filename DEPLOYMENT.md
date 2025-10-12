# Korean Keyboard PWA - Deployment Guide

## GitHub Pages Deployment

This PWA is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Repository Configuration:**
   - The repository should be named `korean-keyboard` for the deployment to work correctly
   - If using a different name, update the `base` path in `vite.config.mjs`

3. **Automatic Deployment:**
   - The workflow triggers on pushes to `main` or `master` branch
   - Builds the PWA using Vite
   - Deploys to GitHub Pages automatically

### Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
npm ci

# Build the PWA
npm run build

# The built files will be in the `dist` directory
# Upload these to your hosting provider
```

### Configuration Files

- **`.github/workflows/deploy.yml`** - GitHub Actions workflow
- **`vite.config.mjs`** - Vite configuration with PWA settings
- **`package.json`** - Build scripts and homepage URL

### PWA Features

- **Service Worker:** Automatically caches resources for offline use
- **Manifest:** Provides app-like experience when installed
- **Auto-update:** Service worker updates automatically
- **Offline Support:** App works without internet connection

### Troubleshooting

1. **Build Fails:**
   - Check Node.js version (requires 18+)
   - Ensure all dependencies are installed
   - Check for TypeScript errors

2. **Deployment Fails:**
   - Verify GitHub Pages is enabled
   - Check repository permissions
   - Ensure workflow has necessary permissions

3. **PWA Not Working:**
   - Verify HTTPS is enabled (required for PWA)
   - Check manifest.json is accessible
   - Ensure service worker is registered

### URLs

- **Live Site:** https://escowin.github.io/korean-keyboard/
- **Repository:** https://github.com/escowin/korean-keyboard

### Features

- ✅ Modern Korean keyboard (Dubeolsik layout)
- ✅ Archaic Korean characters (옛한글)
- ✅ Syllable composition
- ✅ Complex medials and finals
- ✅ Long-press variants
- ✅ PWA functionality
- ✅ Offline support
- ✅ Mobile responsive
