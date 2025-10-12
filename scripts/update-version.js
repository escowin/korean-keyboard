#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json to get current version
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const version = packageJson.version;

// Generate timestamp for additional cache busting
const timestamp = new Date().toISOString();

console.log(`Updating PWA version to ${version} with timestamp ${timestamp}`);

// Update manifest.json
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

manifest.version = version;
manifest.timestamp = timestamp;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ Updated manifest.json');

// Update service worker
const swPath = path.join(__dirname, '..', 'public', 'sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');

// Update CACHE_VERSION
const cacheVersion = `korean-keyboard-pwa-v${version.replace(/\./g, '-')}-${Date.now()}`;
swContent = swContent.replace(
  /const CACHE_NAME = '[^']*'/,
  `const CACHE_NAME = '${cacheVersion}'`
);

// Update CACHE_VERSION constant if it exists
if (swContent.includes('CACHE_VERSION')) {
  swContent = swContent.replace(
    /const CACHE_VERSION = '[^']*'/,
    `const CACHE_VERSION = '${cacheVersion}'`
  );
} else {
  // Add CACHE_VERSION constant after CACHE_NAME
  swContent = swContent.replace(
    /const CACHE_NAME = '[^']*'/,
    `const CACHE_NAME = '${cacheVersion}'\nconst CACHE_VERSION = '${cacheVersion}'`
  );
}

fs.writeFileSync(swPath, swContent);
console.log('✅ Updated service worker');

console.log(`🎉 PWA version updated successfully!`);
console.log(`   Version: ${version}`);
console.log(`   Cache: ${cacheVersion}`);
console.log(`   Timestamp: ${timestamp}`);
