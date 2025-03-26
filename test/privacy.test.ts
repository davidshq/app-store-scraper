import { describe, it, expect } from 'vitest';
import store from '../index.js';

interface PrivacyType {
  privacyType: string;
  identifier: string;
  description: string;
  dataCategories: string[] | any[];
}

interface PrivacyResult {
  privacyTypes: PrivacyType[];
}

function assertValid(privacyType: PrivacyType): void {
  expect(privacyType.privacyType).toBeTypeOf('string');
  expect(privacyType.identifier).toBeTypeOf('string');
  expect(privacyType.description).toBeTypeOf('string');
  expect(privacyType.dataCategories).toBeDefined();
}

describe('Privacy method', () => {
  it('should retrieve the privacy details of an app', async () => {
    const privacy = (await store.privacy({ id: '324684580' })) as PrivacyResult;
    expect(privacy.privacyTypes).toBeDefined();
    expect(privacy.privacyTypes.length).toBeGreaterThan(0);
    privacy.privacyTypes.map(assertValid);
  });
});
