import { assert } from 'chai';
import { assertValidApp } from './common.js';
import store from '../index.js';

const FACEBOOK_ID = '284882218';

describe('Developer method', () => {
  it('should fetch a valid application list', () => {
    return store.developer({devId: FACEBOOK_ID})
      .then((apps) => {
        apps.map(assertValidApp);
        apps.map((app) => {
          assert.equal(app.developerId, FACEBOOK_ID);
          assert.equal(app.developer, 'Meta Platforms, Inc.');
        });
      });
  });

  it('should fetch a valid developer list for games', () => {
    return store.developer({devId: '284882218'})
      .then((games) => {
        assert.isArray(games);
        return games.map(assertValidApp);
      });
  });
});
