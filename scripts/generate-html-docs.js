#!/usr/bin/env node

/**
 * Script to generate HTML API documentation for app-store-scraper
 *
 * This script:
 * 1. Runs TypeDoc to generate HTML API docs
 * 2. Copies DOCUMENTATION.md content to the HTML docs
 * 3. Creates additional assets for better browsing
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Generate HTML docs using TypeDoc
console.log('Generating HTML API documentation with TypeDoc...');
execSync('npm run docs:html', { stdio: 'inherit', cwd: rootDir });

// Create .nojekyll file for GitHub Pages
const nojekyllPath = path.join(rootDir, 'docs-html', '.nojekyll');
fs.writeFileSync(nojekyllPath, '');

// Copy the DOCUMENTATION.md content to a more visible location in the HTML docs
console.log('Setting up additional documentation...');
const docFile = path.join(rootDir, 'DOCUMENTATION.md');
if (fs.existsSync(docFile)) {
  const docContent = fs.readFileSync(docFile, 'utf8');

  // Create a custom.css file for better styling
  const cssContent = `
    .examples-section {
      margin-top: 2rem;
      padding: 1.5rem;
      background-color: #f8f9fa;
      border-radius: 6px;
    }
    .examples-section pre {
      background-color: #f1f1f1;
      padding: 1rem;
      border-radius: 4px;
    }
  `;

  const cssPath = path.join(rootDir, 'docs-html', 'assets', 'custom.css');
  fs.mkdirSync(path.dirname(cssPath), { recursive: true });
  fs.writeFileSync(cssPath, cssContent);

  // Inject reference to the custom CSS in the index.html file
  const indexPath = path.join(rootDir, 'docs-html', 'index.html');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    indexContent = indexContent.replace(
      '</head>',
      '<link rel="stylesheet" href="./assets/custom.css"></head>'
    );
    fs.writeFileSync(indexPath, indexContent);
  }
}

console.log('HTML Documentation generated successfully!');
console.log('You can find the HTML documentation in the "docs-html" directory.');
console.log('To view it, open docs-html/index.html in your browser.');
