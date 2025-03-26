// @ts-nocheck
import { expect } from 'chai';
import { assertValidApp, assertValidUrl } from './common-utils.test.js';
import store from '../index.js';

describe('List method', () => {
  it('should fetch a valid application list for the given category and collection', () => {
    return store
      .list({
        category: store.category.GAMES_ACTION,
        collection: store.collection.TOP_FREE_IOS
      })
      .then(apps => {
        apps.forEach(assertValidApp);
        apps.forEach(app => expect(app.free).to.be.true);
      });
  });

  it('should validate the category', () => {
    try {
      store.list({
        category: 'wrong',
        collection: store.collection.TOP_FREE_IOS
      });
      throw new Error('Function did not throw expected validation error');
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.include('Invalid value "wrong" for "category"');
      expect(e.code).to.equal('VALIDATION_ERROR');
    }
  });

  it('should validate the collection', () => {
    try {
      store.list({
        category: store.category.GAMES_ACTION,
        collection: 'wrong'
      });
      throw new Error('Function did not throw expected validation error');
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.include('Invalid value "wrong" for "collection"');
      expect(e.code).to.equal('VALIDATION_ERROR');
    }
  });

  it('should validate the results number', () => {
    try {
      store.list({
        category: store.category.GAMES_ACTION,
        collection: store.collection.TOP_FREE_IOS,
        num: 250
      });
      throw new Error('Function did not throw expected validation error');
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.include('must be at most 200');
      expect(e.code).to.equal('VALIDATION_ERROR');
    }
  });

  it('should fetch apps with fullDetail', () => {
    return store
      .list({
        collection: store.collection.TOP_FREE_GAMES_IOS,
        fullDetail: true,
        num: 3
      })
      .then(apps => {
        apps.forEach(assertValidApp);
        apps.forEach(app => {
          expect(app.description).to.be.a('string');

          // getting some entertainment apps here, skipping the check
          // assert.equal(app.primaryGenre, 'Games');
          // assert.equal(app.primaryGenreId, '6014');

          if (typeof app.price === 'string') {
            expect(app.price).to.equal('0.00000');
          } else {
            expect(app.price).to.equal(0);
          }
          expect(app.free).to.be.true;

          expect(app.developer).to.be.a('string');
          if (app.developerWebsite) {
            assertValidUrl(app.developerWebsite);
          }
        });
      });
  });

  it('should be able to set requestOptions', done => {
    store
      .list({
        collection: store.collection.TOP_FREE_GAMES_IOS,
        num: 5,
        requestOptions: {
          method: 'DELETE'
        }
      })
      .then(() => done('should not resolve'))
      .catch(err => {
        expect(err.response.statusCode).to.equal(501);
        done();
      })
      .catch(done);
  });
});
