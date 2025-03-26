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

// Generate docs using TypeDoc
console.log('Generating API documentation with TypeDoc...');
execSync('npm run docs', { stdio: 'inherit' });

// Copy DOCUMENTATION.md to docs/README.md to serve as the main documentation page
console.log('Setting up documentation index...');
if (fs.existsSync('DOCUMENTATION.md')) {
  const docsDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  fs.copyFileSync('DOCUMENTATION.md', path.join(docsDir, 'README.md'));
}

// Create .nojekyll file for GitHub Pages
const nojekyllPath = path.join(process.cwd(), 'docs', '.nojekyll');
fs.writeFileSync(nojekyllPath, '');

console.log('Documentation generated successfully!');
console.log('You can find the documentation in the "docs" directory.');
