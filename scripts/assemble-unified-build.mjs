#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distRoot = path.join(rootDir, 'dist');
const hostDist = path.join(rootDir, 'apps', 'host', 'dist');
const dashboardDist = path.join(rootDir, 'apps', 'remote-dashboard', 'dist');
const ordersDist = path.join(rootDir, 'apps', 'remote-orders', 'dist');

console.log('🚀 Assembling Unified Production Build...');

// Helper to recursively copy directories
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory not found: ${src}. Did you run build first?`);
  }
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // 1. Reset root dist/
  if (fs.existsSync(distRoot)) {
    fs.rmSync(distRoot, { recursive: true, force: true });
  }
  fs.mkdirSync(distRoot, { recursive: true });

  // 2. Copy Host Shell (root /)
  console.log('📦 Copying Host Shell -> dist/');
  copyDirSync(hostDist, distRoot);

  // 3. Copy Dashboard Remote -> dist/remotes/dashboard/
  console.log('📦 Copying Dashboard Remote -> dist/remotes/dashboard/');
  copyDirSync(dashboardDist, path.join(distRoot, 'remotes', 'dashboard'));

  // 4. Copy Orders Remote -> dist/remotes/orders/
  console.log('📦 Copying Orders Remote -> dist/remotes/orders/');
  copyDirSync(ordersDist, path.join(distRoot, 'remotes', 'orders'));

  console.log('\n✅ Unified Production Build Assembled Successfully at ./dist!');
  console.log('📁 Structure:');
  console.log('   ├── dist/index.html (Host Shell)');
  console.log('   ├── dist/assets/ (Host Assets)');
  console.log('   ├── dist/remotes/dashboard/assets/remoteEntry.js (Team Alpha Dashboard)');
  console.log('   └── dist/remotes/orders/assets/remoteEntry.js (Team Beta Orders)');
} catch (err) {
  console.error('\n❌ Assembly Failed:', err.message);
  process.exit(1);
}
