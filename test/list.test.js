// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { assertValidApp, assertValidUrl } from './common-utils.test.js';
import store from '../index.js';

describe('List method', () => {
  it('should fetch a valid application list for the given category and collection', async () => {
    const apps = await store.list({
      category: store.category.GAMES_ACTION,
      collection: store.collection.TOP_FREE_IOS
    });
    apps.forEach(assertValidApp);
    apps.forEach(app => expect(app.free).toBe(true));
  });

  it('should validate the category', () => {
    expect(() => {
      store.list({
        category: 'wrong',
        collection: store.collection.TOP_FREE_IOS
      });
    }).toThrow();

    try {
      store.list({
        category: 'wrong',
        collection: store.collection.TOP_FREE_IOS
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toContain('Invalid value "wrong" for "category"');
      expect(e.code).toBe('VALIDATION_ERROR');
    }
  });

  it('should validate the collection', () => {
    expect(() => {
      store.list({
        category: store.category.GAMES_ACTION,
        collection: 'wrong'
      });
    }).toThrow();

    try {
      store.list({
        category: store.category.GAMES_ACTION,
        collection: 'wrong'
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toContain('Invalid value "wrong" for "collection"');
      expect(e.code).toBe('VALIDATION_ERROR');
    }
  });

  it('should validate the results number', () => {
    expect(() => {
      store.list({
        category: store.category.GAMES_ACTION,
        collection: store.collection.TOP_FREE_IOS,
        num: 250
      });
    }).toThrow();

    try {
      store.list({
        category: store.category.GAMES_ACTION,
        collection: store.collection.TOP_FREE_IOS,
        num: 250
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toContain('must be at most 200');
      expect(e.code).toBe('VALIDATION_ERROR');
    }
  });

  it('should fetch apps with fullDetail', async () => {
    const apps = await store.list({
      collection: store.collection.TOP_FREE_GAMES_IOS,
      fullDetail: true,
      num: 3
    });

    apps.forEach(assertValidApp);
    apps.forEach(app => {
      expect(app.description).toBeTypeOf('string');

      // getting some entertainment apps here, skipping the check
      // expect(app.primaryGenre).toBe('Games');
      // expect(app.primaryGenreId).toBe('6014');

      if (typeof app.price === 'string') {
        expect(app.price).toBe('0.00000');
      } else {
        expect(app.price).toBe(0);
      }
      expect(app.free).toBe(true);

      expect(app.developer).toBeTypeOf('string');
      if (app.developerWebsite) {
        assertValidUrl(app.developerWebsite);
      }
    });
  });

  it('should be able to set requestOptions', async () => {
    await expect(
      store.list({
        collection: store.collection.TOP_FREE_GAMES_IOS,
        num: 5,
        requestOptions: {
          method: 'DELETE'
        }
      })
    ).rejects.toThrow();
  });
});
