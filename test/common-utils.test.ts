import { describe, it, expect } from 'vitest';
import validator from 'validator';
import type { App } from '../lib/types/app-types.js';
import type { SearchResult, ListResult, DeveloperResult } from './convert-helper.js';

describe('Common Utilities', () => {
  it('should validate URL correctly', () => {
    const validUrl = 'https://example.com';
    const isValid = validator.isURL(validUrl, { allow_protocol_relative_urls: true });
    expect(isValid).toBe(true);
  });

  it('should reject invalid URL', () => {
    const invalidUrl = 'not-a-url';
    const isValid = validator.isURL(invalidUrl, { allow_protocol_relative_urls: true });
    expect(isValid).toBe(false);
  });
});

function assertValidUrl(url: string): boolean {
  const isValid = validator.isURL(url, { allow_protocol_relative_urls: true });
  expect(isValid, `${url} is not a valid url`).toBe(true);
  return isValid;
}

/**
 * Asserts that an app object is valid based on its properties
 * This function can handle App, SearchResult, ListResult, and DeveloperResult types
 */
function assertValidApp(app: App | SearchResult | ListResult | DeveloperResult): any {
  // Common properties across all types
  expect(app.title).toBeTypeOf('string');
  expect(app.appId).toBeTypeOf('string');

  // Check URL if it exists
  if ('url' in app && app.url) {
    assertValidUrl(app.url);
  }

  // Check icon if it exists
  if ('icon' in app && app.icon) {
    assertValidUrl(app.icon);
  }

  // Check description if it exists
  if ('description' in app && app.description) {
    expect(app.description).toBeTypeOf('string');
  }

  // Check score if it exists
  if ('score' in app && app.score !== undefined) {
    expect(app.score).toBeTypeOf('number');
    expect(app.score).toBeGreaterThanOrEqual(0);
    expect(app.score).toBeLessThanOrEqual(5);
  }

  // Check free property if it exists
  if ('free' in app) {
    expect(app.free).toBeTypeOf('boolean');
  }

  return app;
}

export { assertValidUrl, assertValidApp };
