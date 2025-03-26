#!/usr/bin/env node

/**
 * This script assists in migrating test files from Mocha/Chai to Vitest
 * It converts most common assertion patterns and provides guidance for manual conversion
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, '..', 'test');

// Common replacement patterns
const replacements = [
  // Imports
  [/import { expect } from ['"]chai['"];/, "import { describe, it, expect } from 'vitest';"],
  [/import { assert } from ['"]chai['"];/, "import { describe, it, expect } from 'vitest';"],

  // Promise-based tests
  [
    /it\(['"](.+)['"], \(\) => \{\s*return (.+)\s*\.then\((.+) => \{/g,
    "it('$1', async () => {\n  const $3 = await $2;"
  ],

  // Callback-style tests
  [
    /it\(['"](.+)['"], done => \{\s*(.+)\s*\.then\(\(\) => done\(['"].+['"]\)\)\s*\.catch\(err => \{\s*(.+)\s*done\(\);\s*\}\)\s*\.catch\(done\);/g,
    "it('$1', async () => {\n  await expect($2).rejects.toThrow();"
  ],

  // Basic assertions
  [/assert\.equal\((.+), (.+)\);/g, 'expect($1).toBe($2);'],
  [/assert\((.+) ([><=!]{1,3}) (.+)\);/g, 'expect($1).$2($3);'],
  [/assert\.isString\((.+)\);/g, "expect($1).toBeTypeOf('string');"],
  [/assert\.isNumber\((.+)\);/g, "expect($1).toBeTypeOf('number');"],
  [/assert\.isBoolean\((.+)\);/g, "expect($1).toBeTypeOf('boolean');"],
  [/assert\.isArray\((.+)\);/g, 'expect($1).toBeInstanceOf(Array);'],
  [/assert\.isObject\((.+)\);/g, "expect($1).toBeTypeOf('object');"],
  [/assert\.isAtLeast\((.+), (.+)\);/g, 'expect($1).toBeGreaterThanOrEqual($2);'],
  [/assert\.isAtMost\((.+), (.+)\);/g, 'expect($1).toBeLessThanOrEqual($2);'],
  [/assert\.isNotOk\((.+)\);/g, 'expect($1).toBeFalsy();'],
  [/expect\((.+)\)\.to\.be\.a\(["'](.+)["']\);/g, "expect($1).toBeTypeOf('$2');"],
  [/expect\((.+)\)\.to\.be\.an\(["'](.+)["']\);/g, 'expect($1).toBeInstanceOf(Error);'],
  [/expect\((.+)\)\.to\.equal\((.+)\);/g, 'expect($1).toBe($2);'],
  [/expect\((.+)\)\.to\.include\((.+)\);/g, 'expect($1).toContain($2);'],
  [/expect\((.+)\)\.to\.be\.at\.least\((.+)\);/g, 'expect($1).toBeGreaterThanOrEqual($2);'],
  [/expect\((.+)\)\.to\.exist;/g, 'expect($1).toBeDefined();'],
  [/expect\((.+)\)\.to\.be\.true;/g, 'expect($1).toBe(true);'],
  [/expect\((.+)\)\.to\.be\.false;/g, 'expect($1).toBe(false);']
];

async function processSingleFile(filePath) {
  console.log(`Processing ${filePath}...`);

  // Read file content
  let content = await fs.readFile(filePath, 'utf8');

  // Apply all replacements
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }

  // Write transformed content back
  await fs.writeFile(filePath, content, 'utf8');
  console.log(`Transformed ${filePath}`);
}

async function listTestFiles() {
  const files = await fs.readdir(testDir);
  return files.filter(file => file.endsWith('.test.js')).map(file => path.join(testDir, file));
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    // Process specific file
    await processSingleFile(args[0]);
  } else {
    // Process all test files
    const files = await listTestFiles();
    console.log(`Found ${files.length} test files`);

    for (const file of files) {
      await processSingleFile(file);
    }
  }
}

main().catch(console.error);
