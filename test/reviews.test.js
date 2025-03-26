// @ts-nocheck
import { describe, it, expect } from 'vitest';
import store from '../index.js';
import c from '../dist/lib/constants.js';

describe('Reviews method', () => {
  it('should retrieve the reviews of an app', async () => {
    const reviews = await store.reviews({
      id: '553834731',
      country: 'us'
    });

    expect(reviews.length).toBeGreaterThanOrEqual(1);
    expect(reviews[0].id).toBeDefined();
    expect(reviews[0].text).toBeDefined();
    expect(reviews[0].title).toBeDefined();
    expect(reviews[0].url).toBeDefined();
    expect(reviews[0].score).toBeDefined();
    expect(reviews[0].userName).toBeDefined();
    expect(reviews[0].userUrl).toBeDefined();
    expect(reviews[0].version).toBeDefined();
    expect(reviews[0].updated).toBeDefined();
  });

  it('should validate the sort', () => {
    expect(() => {
      store.reviews({
        id: '553834731',
        sort: 'invalid'
      });
    }).toThrow();

    try {
      store.reviews({
        id: '553834731',
        sort: 'invalid'
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toContain('Invalid value "invalid" for "sort"');
      expect(e.code).toBe('VALIDATION_ERROR');
    }
  });

  it('should fetch reviews with newer version of store', async () => {
    const reviews = await store.reviews({
      id: '553834731',
      sort: c.sort.HELPFUL
    });

    expect(reviews.length).toBeGreaterThanOrEqual(1);
  });

  it('should validate the page', () => {
    expect(() => {
      store.reviews({
        id: '553834731',
        page: 11
      });
    }).toThrow();

    try {
      store.reviews({
        id: '553834731',
        page: 11
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toContain('must be at most 10');
      expect(e.code).toBe('VALIDATION_ERROR');
    }
  });

  it('should be able to set requestOptions', async () => {
    await expect(
      store.reviews({
        id: '553834731',
        requestOptions: {
          method: 'DELETE'
        }
      })
    ).rejects.toThrow();
  });
});
