// @ts-nocheck
import { assert } from 'chai';
import { assertValidApp } from './common-utils.test.js';
import store from '../index.js';

const FACEBOOK_ID = '284882218';

describe('Developer method', () => {
  it('should fetch a valid application list', () => {
    return store.developer({ devId: FACEBOOK_ID }).then(apps => {
      apps.forEach(assertValidApp);
      apps.forEach(app => {
        assert.equal(app.developerId, FACEBOOK_ID);
        assert.equal(app.developer, 'Meta Platforms, Inc.');
      });
    });
  });

  it('should fetch a valid developer list for games', () => {
    return store.developer({ devId: '284882218' }).then(games => {
      assert.isArray(games);
      games.forEach(assertValidApp);
    });
  });
});
