// @ts-nocheck
import { describe, it, expect } from 'vitest';
import store from '../index.js';
import { assertValidApp } from './common-utils.test.js';

describe('Search method', () => {
  it('should fetch a valid application list', async () => {
    const apps = await store.search({ term: 'Panda vs Zombies' });
    apps.map(assertValidApp);
  });

  it('should properly paginate results', async () => {
    const p1 = store.search({ term: 'Panda', num: 10 });
    const p2 = store.search({ term: 'Panda', num: 10, page: 2 });
    const [apps1, apps2] = await Promise.all([p1, p2]);

    expect(apps1.length).toBe(10);
    expect(apps2.length).toBe(10);
    apps1.map(assertValidApp);
    apps2.map(assertValidApp);
    expect(apps1[0].appId).not.toBe(apps2[0].appId);
  });

  it('should fetch a valid application list in fr country', async () => {
    const apps = await store.search({ country: 'fr', term: 'Panda vs Zombies' });
    apps.map(assertValidApp);
    if (apps.length > 0) {
      expect(apps[0].url.startsWith('https://apps.apple.com/fr')).toBe(true);
    }
  });

  it('should validate the results number', async () => {
    const count = 5;
    const apps = await store.search({
      term: 'vr',
      num: count
    });

    apps.map(assertValidApp);
    expect(apps.length).toBe(count);
  });

  it('should be able to set requestOptions', async () => {
    await expect(
      store.search({
        term: 'vr',
        requestOptions: {
          method: 'DELETE'
        }
      })
    ).rejects.toThrow();
  });

  it('should be able to retrieve array of application ids', async () => {
    const res = await store.search({
      term: 'vr',
      idsOnly: true
    });

    expect(res).toBeInstanceOf(Array);
    expect(res.every(item => typeof item === 'string')).toBe(true);
  });
});
