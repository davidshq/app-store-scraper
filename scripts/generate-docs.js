#!/usr/bin/env node

/**
 * Script to generate API documentation for app-store-scraper
 *
 * This script:
 * 1. Runs TypeDoc to generate API docs
 * 2. Copies DOCUMENTATION.md to docs/README.md as the main documentation page
 * 3. Handles any post-processing needed
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Generate docs using TypeDoc
console.log('Generating API documentation with TypeDoc...');
execSync('npm run docs', { stdio: 'inherit', cwd: rootDir });

// Copy DOCUMENTATION.md to docs/README.md to serve as the main documentation page
console.log('Setting up documentation index...');
const docFile = path.join(rootDir, 'DOCUMENTATION.md');
if (fs.existsSync(docFile)) {
  const docsDir = path.join(rootDir, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  fs.copyFileSync(docFile, path.join(docsDir, 'README.md'));
}

// Create .nojekyll file for GitHub Pages
const nojekyllPath = path.join(rootDir, 'docs', '.nojekyll');
fs.writeFileSync(nojekyllPath, '');

console.log('Documentation generated successfully!');
console.log('You can find the documentation in the "docs" directory.');
