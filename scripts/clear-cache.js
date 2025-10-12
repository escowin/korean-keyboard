#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a timestamp-based version for immediate cache invalidation
const timestamp = Date.now();
const version = `1.0.0-${timestamp}`;

console.log(`Forcing cache clear with timestamp version: ${version}`);

// Update package.json version temporarily
const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const originalVersion = packageJson.version;
packageJson.version = version;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log(`✅ Updated package.json version to ${version}`);

// Update manifest.json
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

manifest.version = version;
manifest.timestamp = new Date().toISOString();

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ Updated manifest.json');

// Update service worker with timestamp-based cache name
const swPath = path.join(__dirname, '..', 'public', 'sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');

const cacheVersion = `korean-keyboard-pwa-v${version.replace(/\./g, '-')}-${timestamp}`;
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

console.log(`🎉 Cache clear completed!`);
console.log(`   Forced version: ${version}`);
console.log(`   Cache: ${cacheVersion}`);
console.log(`   Original version: ${originalVersion}`);
console.log(`   ⚠️  Remember to restore original version in package.json if needed`);
