import { describe, it, expect } from 'vitest';
import { assertValidApp } from './common-utils.test.js';
import store from '../index.js';
import type { DeveloperResult } from './convert-helper.js';

const FACEBOOK_ID = 284882218;

describe('Developer method', () => {
  it('should fetch a valid application list', async () => {
    const apps = (await store.developer({ devId: FACEBOOK_ID })) as DeveloperResult[];
    apps.forEach(assertValidApp);
    apps.forEach(app => {
      expect(app.developerId).toBe(FACEBOOK_ID);
      expect(app.developer).toBe('Meta Platforms, Inc.');
    });
  });

  it('should fetch a valid developer list for games', async () => {
    const games = (await store.developer({ devId: '284882218' })) as DeveloperResult[];
    expect(games).toBeInstanceOf(Array);
    games.forEach(assertValidApp);
  });
});
