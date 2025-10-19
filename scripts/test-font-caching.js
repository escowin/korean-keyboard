#!/usr/bin/env node

/**
 * Test script to verify font caching in the PWA
 * This script checks if the font is properly cached and accessible offline
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing font caching configuration...\n');

// Check if font file exists
const fontPath = path.join(__dirname, '../public/fonts/ChironSungHK-VariableFont_wght.ttf');
if (fs.existsSync(fontPath)) {
  const stats = fs.statSync(fontPath);
  console.log('✅ Font file exists:', fontPath);
  console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
} else {
  console.log('❌ Font file not found:', fontPath);
  process.exit(1);
}

// Check service worker configuration
const swPath = path.join(__dirname, '../public/sw.js');
if (fs.existsSync(swPath)) {
  const swContent = fs.readFileSync(swPath, 'utf8');
  
  // Check if font is in FONTS array
  if (swContent.includes('/korean-keyboard/fonts/ChironSungHK-VariableFont_wght.ttf')) {
    console.log('✅ Font path correctly configured in service worker');
  } else {
    console.log('❌ Font path not found in service worker FONTS array');
  }
  
  // Check if font caching logic exists
  if (swContent.includes('url.pathname.endsWith(\'.ttf\')')) {
    console.log('✅ Font file extension caching logic present');
  } else {
    console.log('❌ Font file extension caching logic missing');
  }
} else {
  console.log('❌ Service worker not found:', swPath);
}

// Check Vite PWA configuration
const viteConfigPath = path.join(__dirname, '../vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const viteContent = fs.readFileSync(viteConfigPath, 'utf8');
  
  if (viteContent.includes('fonts/ChironSungHK-VariableFont_wght.ttf')) {
    console.log('✅ Font included in Vite PWA includeAssets');
  } else {
    console.log('❌ Font not included in Vite PWA includeAssets');
  }
  
  if (viteContent.includes('globPatterns: [\'**/*.{js,css,html,ico,png,svg,ttf,woff,woff2}\']')) {
    console.log('✅ Font file extensions included in globPatterns');
  } else {
    console.log('❌ Font file extensions missing from globPatterns');
  }
} else {
  console.log('❌ Vite config not found:', viteConfigPath);
}

// Check CSS font-face declaration
const cssPath = path.join(__dirname, '../src/styles/main.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  if (cssContent.includes('/korean-keyboard/fonts/ChironSungHK-VariableFont_wght.ttf')) {
    console.log('✅ Font path correctly configured in CSS @font-face');
  } else {
    console.log('❌ Font path incorrect in CSS @font-face');
  }
} else {
  console.log('❌ Main CSS file not found:', cssPath);
}

// Check HTML preload
const htmlPath = path.join(__dirname, '../index.html');
if (fs.existsSync(htmlPath)) {
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  if (htmlContent.includes('/korean-keyboard/fonts/ChironSungHK-VariableFont_wght.ttf')) {
    console.log('✅ Font preload correctly configured in HTML');
  } else {
    console.log('❌ Font preload incorrect in HTML');
  }
} else {
  console.log('❌ Index HTML file not found:', htmlPath);
}

console.log('\n🎯 Font caching test completed!');
console.log('\n📋 Next steps:');
console.log('1. Build the project: npm run build');
console.log('2. Test offline access by:');
console.log('   - Opening the PWA in browser');
console.log('   - Going offline in DevTools');
console.log('   - Refreshing the page');
console.log('   - Verifying Korean text displays correctly with the custom font');
console.log('\n💡 The font should now be cached and available offline!');
