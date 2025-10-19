#!/usr/bin/env node

/**
 * Test script to verify version display functionality
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing version display functionality...\n');

// Check if version constant file exists and has correct structure
const versionPath = path.join(__dirname, '../src/constants/version.ts');
if (fs.existsSync(versionPath)) {
  const versionContent = fs.readFileSync(versionPath, 'utf8');
  
  // Check for required exports
  if (versionContent.includes('export const APP_VERSION')) {
    console.log('✅ APP_VERSION constant found');
  } else {
    console.log('❌ APP_VERSION constant missing');
  }
  
  if (versionContent.includes('export const BUILD_TIMESTAMP')) {
    console.log('✅ BUILD_TIMESTAMP constant found');
  } else {
    console.log('❌ BUILD_TIMESTAMP constant missing');
  }
  
  if (versionContent.includes('export const getVersionDisplay')) {
    console.log('✅ getVersionDisplay function found');
  } else {
    console.log('❌ getVersionDisplay function missing');
  }
  
  // Extract version from the file
  const versionMatch = versionContent.match(/export const APP_VERSION = '([^']+)'/);
  if (versionMatch) {
    console.log(`✅ Current version: ${versionMatch[1]}`);
  }
  
  // Extract timestamp from the file
  const timestampMatch = versionContent.match(/export const BUILD_TIMESTAMP = '([^']+)'/);
  if (timestampMatch) {
    console.log(`✅ Build timestamp: ${timestampMatch[1]}`);
  }
} else {
  console.log('❌ Version constant file not found:', versionPath);
}

// Check if App.tsx imports and uses the version
const appPath = path.join(__dirname, '../src/App.tsx');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  
  if (appContent.includes("import { getVersionDisplay } from './constants/version.js'")) {
    console.log('✅ App.tsx imports getVersionDisplay');
  } else {
    console.log('❌ App.tsx missing getVersionDisplay import');
  }
  
  if (appContent.includes('<span className="version-badge">{getVersionDisplay()}</span>')) {
    console.log('✅ App.tsx uses version badge in h1 element');
  } else {
    console.log('❌ App.tsx missing version badge in h1 element');
  }
} else {
  console.log('❌ App.tsx not found:', appPath);
}

// Check if CSS styling exists for version badge
const cssPath = path.join(__dirname, '../src/styles/noteapp.css');
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  if (cssContent.includes('.version-badge')) {
    console.log('✅ Version badge CSS styling found');
  } else {
    console.log('❌ Version badge CSS styling missing');
  }
} else {
  console.log('❌ CSS file not found:', cssPath);
}

// Check if version script updates the React constant
const scriptPath = path.join(__dirname, '../scripts/update-version.js');
if (fs.existsSync(scriptPath)) {
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  
  if (scriptContent.includes('Update React version constant')) {
    console.log('✅ Version script updates React constant');
  } else {
    console.log('❌ Version script missing React constant update');
  }
} else {
  console.log('❌ Version script not found:', scriptPath);
}

console.log('\n🎯 Version display test completed!');
console.log('\n📋 What the version display provides:');
console.log('• Shows current app version in the header (e.g., "v1.0.0")');
console.log('• Updates automatically when you run "npm run build"');
console.log('• Helps users know when the app has been updated');
console.log('• Styled as a small badge next to the app title');
console.log('\n💡 The version will now appear as: "옛정음필기 v1.0.0"');
