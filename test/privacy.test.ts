import { describe, it, expect } from 'vitest';
import store from '../index.js';

// Define a more flexible interface that matches the actual API response structure
interface PrivacyType {
  privacyType?: string;
  identifier: string;
  description: string;
  dataCategories?: any[];
  // Allow for other properties returned by the API
  [key: string]: any;
}

function assertValid(privacyType: PrivacyType): void {
  expect(privacyType.identifier).toBeTypeOf('string');
  expect(privacyType.description).toBeTypeOf('string');
  // Check if property exists and is a valid type rather than enforcing a specific structure
  if (privacyType.privacyType) {
    expect(privacyType.privacyType).toBeTypeOf('string');
  }
  if (privacyType.dataCategories) {
    expect(Array.isArray(privacyType.dataCategories)).toBe(true);
  }
}

describe('Privacy method', () => {
  it('should retrieve the privacy details of an app', async () => {
    const privacy = await store.privacy({ id: '324684580' });
    // Use type assertion with a more general structure
    expect(privacy).toBeDefined();
    // Check if privacyTypes exists and has content
    const privacyTypes = privacy.privacyTypes || [];
    expect(privacyTypes.length).toBeGreaterThan(0);
    // Validate each privacy type
    privacyTypes.forEach((item: any) => assertValid(item));
  });
});
