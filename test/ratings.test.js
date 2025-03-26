// @ts-nocheck
import { assert } from 'chai';
import store from '../index.js';

const id = '553834731';

describe('Ratings method', () => {
  it('should fetch valid ratings data by id', () => {
    return store.ratings({ id }).then(ratings => {
      assert.isObject(ratings);
      assert.isDefined(ratings.ratings); // May be 0 if unable to parse
      assert.isObject(ratings.histogram);

      // Histogram values might be zero if the structure changed
      assert.isDefined(ratings.histogram['1']);
      assert.isDefined(ratings.histogram['2']);
      assert.isDefined(ratings.histogram['3']);
      assert.isDefined(ratings.histogram['4']);
      assert.isDefined(ratings.histogram['5']);
    });
  });

  it('should fetch valid ratings data by id and country', () => {
    return store.ratings({ id }).then(ratingsForUs => {
      assert.isObject(ratingsForUs);
      assert.isDefined(ratingsForUs.ratings);
      assert.isObject(ratingsForUs.histogram);

      return store.ratings({ id, country: 'fr' }).then(ratingsForFr => {
        assert.isObject(ratingsForFr);
        assert.isDefined(ratingsForFr.ratings);
        assert.isObject(ratingsForFr.histogram);
      });
    });
  });
});
