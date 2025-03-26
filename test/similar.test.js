// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { assertValidApp } from './common-utils.test.js';
import store from '../index.js';

describe('Similar method', () => {
  it('should fetch a valid application list', async () => {
    const apps = await store.similar({ id: '553834731' });
    expect(apps).toBeInstanceOf(Array);
    apps.map(assertValidApp);
  });

  it.skip('should a different list in fr country', async () => {
    const usApps = await store.similar({ id: '553834731' });
    const frApps = await store.similar({ id: '553834731', country: 'fr' });

    frApps.map(assertValidApp);

    let areDifferent = false;
    for (let i = 0; i < frApps.length; i++) {
      if (usApps[i] && frApps[i] && usApps[i].id !== frApps[i].id) {
        areDifferent = true;
      }
    }
    expect(areDifferent).toBe(true);
  });

  it('should be able to set requestOptions', async () => {
    await expect(
      store.similar({
        id: '553834731',
        requestOptions: {
          method: 'DELETE'
        }
      })
    ).rejects.toThrow();
  });
});
