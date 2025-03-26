// @ts-nocheck
import { describe, it, expect } from 'vitest';
import store from '../index.js';

describe('Suggest method', () => {
  it('should return suggestions for a common term', async () => {
    const results = await store.suggest({ term: 'p' });
    expect(results.length).toBe(10);
    results.forEach(r => {
      expect(r.term.toLowerCase()).toContain('p');
    });
  });

  it('should be able to set requestOptions', async () => {
    await expect(
      store.suggest({
        term: 'p',
        requestOptions: {
          method: 'DELETE'
        }
      })
    ).rejects.toThrow();
  });
});
