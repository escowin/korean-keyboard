# Version Display Feature

## Overview

The Korean Keyboard PWA now displays the current app version in the header, making it easy for users to know when the app has been updated.

## How It Works

### 1. Version Constant (`src/constants/version.ts`)

A centralized version constant file that contains:
- `APP_VERSION`: The current version from package.json
- `BUILD_TIMESTAMP`: When the build was created
- `getVersionDisplay()`: Helper function that returns formatted version (e.g., "v1.0.0")

### 2. Automatic Updates

The version is automatically updated during the build process:
- `npm run build` runs the version update script
- Updates manifest.json, service worker, and React version constant
- Ensures all components stay in sync

### 3. Visual Display

The version appears as a small badge next to the app title:
```
옛정음필기 v1.0.0
```

## Styling

The version badge is styled with:
- Blue accent background (`--color-accent`)
- Small, monospace font
- Rounded corners
- Subtle opacity that increases on hover
- Positioned inline with the main title

## Files Modified

### New Files
- `src/constants/version.ts` - Version constants and helpers
- `scripts/test-version-display.js` - Test script for version functionality

### Modified Files
- `src/App.tsx` - Added version import and display
- `src/styles/noteapp.css` - Added version badge styling
- `scripts/update-version.js` - Now updates React version constant

## Usage

### For Developers
1. Update version in `package.json`
2. Run `npm run build` - version will be updated everywhere automatically
3. Version appears in header: "옛정음필기 v1.0.0"

### For Users
- Version badge shows current app version
- Helps identify when app has been updated
- Provides confidence in app freshness

## Testing

Run the test script to verify everything works:
```bash
node scripts/test-version-display.js
```

## Benefits

1. **User Awareness**: Users can see when the app has been updated
2. **Debugging**: Helps identify which version is running
3. **Transparency**: Shows development activity and app maintenance
4. **Professional**: Adds polish to the app interface

## Future Enhancements

Potential improvements:
- Click version badge to show full build info
- Show update notifications when new version is available
- Display changelog or release notes
- Add version to PWA manifest for app stores
