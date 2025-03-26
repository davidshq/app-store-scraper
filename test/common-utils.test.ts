import { describe, it, expect } from 'vitest';
import validator from 'validator';
import type { App } from '../lib/types/app-types.js';

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

function assertValidApp(app: App): App {
  expect(app.appId).toBeTypeOf('string');
  expect(app.title).toBeTypeOf('string');
  expect(app.description).toBeTypeOf('string');
  assertValidUrl(app.url);
  assertValidUrl(app.icon);

  if (app.score !== undefined) {
    // would fail for new apps without score
    expect(app.score).toBeTypeOf('number');
    expect(app.score).toBeGreaterThanOrEqual(0);
    expect(app.score).toBeLessThanOrEqual(5);
  }

  expect(app.free).toBeTypeOf('boolean');

  return app;
}

export { assertValidUrl, assertValidApp };
