// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { assertValidUrl } from './common-utils.test.js';
import store from '../index.js';

describe('App method', () => {
  it('should fetch valid application data', async () => {
    const app = await store.app({ id: '553834731' });
    expect(app.appId).toBe('com.midasplayer.apps.candycrushsaga');
    expect(app.title).toBe('Candy Crush Saga');
    expect(app.url).toBe('https://apps.apple.com/us/app/candy-crush-saga/id553834731?uo=4');
    assertValidUrl(app.icon);

    expect(app.score).toBeTypeOf('number');
    expect(app.score).toBeGreaterThan(0);
    expect(app.score).toBeLessThanOrEqual(5);

    expect(app.ratings).toBeFalsy();
    expect(app.histogram).toBeFalsy();

    expect(app.reviews).toBeTypeOf('number');

    expect(app.description).toBeTypeOf('string');
    expect(app.updated).toBeTypeOf('string');
    expect(app.primaryGenre).toBe('Games');
    expect(app.primaryGenreId).toBe(6014);
    expect(app.genres).toBeInstanceOf(Array);
    expect(app.genres.length).toBeGreaterThanOrEqual(1);
    expect(app.genreIds).toBeInstanceOf(Array);
    expect(app.genreIds.length).toBeGreaterThanOrEqual(1);

    expect(app.version).toBeTypeOf('string');
    if (app.size) {
      expect(app.size).toBeTypeOf('string');
    }
    expect(app.contentRating).toBeTypeOf('string');

    expect(app.requiredOsVersion).toBeTypeOf('string');

    expect(app.price).toBeTypeOf('number');
    expect(app.price).toBe(0);
    expect(app.free).toBe(true);

    expect(app.developer).toBe('King');
    if (app.developerWebsite) {
      assertValidUrl(app.developerWebsite);
    }

    expect(app.screenshots.length).toBeTruthy();
    app.screenshots.map(assertValidUrl);

    expect(app.releaseNotes).toBeTypeOf('string');
  });

  describe('with ratings option enabled', () => {
    it('should fetch valid application data', async () => {
      const app = await store.app({ id: '553834731', ratings: true });
      expect(app.ratings).toBeDefined();
      expect(app.ratings).toBeTypeOf('number');
      expect(app.histogram).toBeDefined();
      expect(app.histogram).toBeTypeOf('object');
      expect(app.histogram['1']).toBeDefined();
      expect(app.histogram['2']).toBeDefined();
      expect(app.histogram['3']).toBeDefined();
      expect(app.histogram['4']).toBeDefined();
      expect(app.histogram['5']).toBeDefined();
    });

    it('should fetch app with bundle id', async () => {
      const app = await store.app({ appId: 'com.midasplayer.apps.candycrushsaga', ratings: true });
      expect(app.ratings).toBeDefined();
      expect(app.ratings).toBeTypeOf('number');
      expect(app.histogram).toBeDefined();
      expect(app.histogram).toBeTypeOf('object');
      expect(app.histogram['1']).toBeDefined();
      expect(app.histogram['2']).toBeDefined();
      expect(app.histogram['3']).toBeDefined();
      expect(app.histogram['4']).toBeDefined();
      expect(app.histogram['5']).toBeDefined();
    });
  });

  it('should fetch app with bundle id', async () => {
    const app = await store.app({ appId: 'com.midasplayer.apps.candycrushsaga' });
    expect(app.id).toBeTypeOf('number');
    expect(app.id).toBe(553834731);
    expect(app.title).toBe('Candy Crush Saga');
    expect(app.url).toBe('https://apps.apple.com/us/app/candy-crush-saga/id553834731?uo=4');
    expect(app.ratings).toBeFalsy();
    expect(app.histogram).toBeFalsy();
  });

  it('should fetch app in spanish', async () => {
    const app = await store.app({ id: '553834731', country: 'ar' });
    expect(app.appId).toBe('com.midasplayer.apps.candycrushsaga');
    expect(app.title).toBe('Candy Crush Saga');
    expect(app.url).toBe('https://apps.apple.com/ar/app/candy-crush-saga/id553834731?uo=4');
  });

  it('should fetch app in french', async () => {
    const app = await store.app({ id: '553834731', country: 'fr' });
    expect(app.appId).toBe('com.midasplayer.apps.candycrushsaga');
    expect(app.title).toBe('Candy Crush Saga');
    expect(app.url).toBe('https://apps.apple.com/fr/app/candy-crush-saga/id553834731?uo=4');
  });

  it('should reject the promise for an invalid id', async () => {
    await expect(store.app({ id: '123' })).rejects.toThrow('App not found (404)');
  });

  it('should reject the promise for an invalid appId', async () => {
    await expect(store.app({ appId: '123' })).rejects.toThrow('App not found (404)');
  });

  it('should memoize the results when memoize enabled', async () => {
    const memoized = store.memoized();
    const app = await memoized.app({ id: '553834731' });
    expect(app.appId).toBe('com.midasplayer.apps.candycrushsaga');
    expect(app.title).toBe('Candy Crush Saga');
  });

  it('should memoize the results with custom options', async () => {
    const memoized = store.memoized({ maxAge: 1000, max: 10 });
    const app = await memoized.app({ id: '553834731' });
    expect(app.appId).toBe('com.midasplayer.apps.candycrushsaga');
    expect(app.title).toBe('Candy Crush Saga');
  });

  it('should be able to set requestOptions', async () => {
    await expect(
      store.app({
        id: '553834731',
        requestOptions: {
          method: 'DELETE'
        }
      })
    ).rejects.toThrow();
  });
});
