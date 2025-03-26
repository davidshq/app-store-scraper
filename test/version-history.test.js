// @ts-nocheck
import { describe, it, expect } from 'vitest';
import store from '../index.js';

function assertValid(versionHistoryType) {
  expect(versionHistoryType.versionDisplay).toBeTypeOf('string');
  expect(versionHistoryType.releaseNotes).toBeTypeOf('string');
  expect(versionHistoryType.releaseDate).toBeTypeOf('string');
  expect(versionHistoryType.releaseTimestamp).toBeTypeOf('string');
}

describe('Version History method', () => {
  it('should retrieve the version history of an app', async () => {
    const versionHistory = await store.versionHistory({ id: '324684580' });
    expect(versionHistory).toBeDefined();
    expect(versionHistory.length).toBeGreaterThan(0);
    versionHistory.map(assertValid);
  });
});
