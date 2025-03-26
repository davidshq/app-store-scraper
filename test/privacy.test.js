// @ts-nocheck
import { describe, it, expect } from 'vitest';
import store from '../index.js';

function assertValid(privacyType) {
  expect(privacyType.privacyType).toBeTypeOf('string');
  expect(privacyType.identifier).toBeTypeOf('string');
  expect(privacyType.description).toBeTypeOf('string');
  expect(privacyType.dataCategories).toBeDefined();
}

describe('Privacy method', () => {
  it('should retrieve the privacy details of an app', async () => {
    const privacy = await store.privacy({ id: '324684580' });
    expect(privacy.privacyTypes).toBeDefined();
    expect(privacy.privacyTypes.length).toBeGreaterThan(0);
    privacy.privacyTypes.map(assertValid);
  });
});
