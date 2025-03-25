import { expect } from 'chai';
import store from '../index.js';
import c from '../lib/constants.js';

describe('Reviews method', () => {
  it('should retrieve the reviews of an app', () => {
    return store
      .reviews({
        id: '553834731',
        country: 'us'
      })
      .then(reviews => {
        expect(reviews.length).to.be.at.least(1);
        expect(reviews[0].id).to.exist;
        expect(reviews[0].text).to.exist;
        expect(reviews[0].title).to.exist;
        expect(reviews[0].url).to.exist;
        expect(reviews[0].score).to.exist;
        expect(reviews[0].userName).to.exist;
        expect(reviews[0].userUrl).to.exist;
        expect(reviews[0].version).to.exist;
        expect(reviews[0].updated).to.exist;
      });
  });

  it('should validate the sort', () => {
    try {
      store.reviews({
        id: '553834731',
        sort: 'invalid'
      });
      // Should not reach here
      throw new Error('Function did not throw expected validation error');
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.equal('Invalid sort invalid');
    }
  });

  it('should fetch reviews with newer version of store', () => {
    return store
      .reviews({
        id: '553834731',
        sort: c.sort.HELPFUL
      })
      .then(reviews => {
        expect(reviews.length).to.be.at.least(1);
      });
  });

  it('should validate the page', () => {
    try {
      store.reviews({
        id: '553834731',
        page: 11
      });
      // Should not reach here
      throw new Error('Function did not throw expected validation error');
    } catch (e) {
      expect(e).to.be.an('error');
      expect(e.message).to.equal('Page cannot be greater than 10');
    }
  });

  it('should be able to set requestOptions', done => {
    store
      .reviews({
        id: '553834731',
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
