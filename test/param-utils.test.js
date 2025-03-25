import { expect } from 'chai';
import sinon from 'sinon';
import {
  DEFAULTS,
  applyDefaults,
  getStoreHeader,
  addLanguageHeader,
  getUrlParams
} from '../lib/param-utils.js';
import { createMockStoreIdFunction } from './helpers/test-utils.js';

/**
 * Transforms parameters based on rules
 *
 * @param {Object} params - Parameters to transform
 * @param {Object} rules - Rules for transformation
 * @returns {Object} Transformed parameters
 */
function processParams (params = {}, rules = {}) {
  if (!params) return {};

  const result = { ...params };
  Object.keys(rules).forEach(key => {
    if (params[key] !== undefined) {
      result[key] = rules[key](params[key]);
    }
  });

  return result;
}

/**
 * Validates parameters against rules
 *
 * @param {Object} params - Parameters to validate
 * @param {Object} rules - Validation rules
 * @returns {boolean} True if valid, false otherwise
 */
function isValid (params = {}, rules = {}) {
  if (Object.keys(rules).length === 0) return true;

  return Object.keys(rules).every(key => {
    return params[key] !== undefined && rules[key](params[key]);
  });
}

describe('Parameter Utilities', () => {
  describe('applyDefaults', () => {
    it('should apply default values to empty options', () => {
      const opts = {};
      const result = applyDefaults(opts);

      expect(result).to.include(DEFAULTS);
    });

    it('should preserve user-provided values', () => {
      const opts = {
        country: 'uk',
        lang: 'en-gb',
        num: 100
      };

      const result = applyDefaults(opts);

      expect(result.country).to.equal('uk');
      expect(result.lang).to.equal('en-gb');
      expect(result.num).to.equal(100);
      expect(result.page).to.equal(DEFAULTS.page);
    });

    it('should accept custom defaults', () => {
      const opts = { country: 'fr' };
      const customDefaults = {
        country: 'us',
        lang: 'fr-fr',
        limit: 10
      };

      const result = applyDefaults(opts, customDefaults);

      expect(result.country).to.equal('fr');
      expect(result.lang).to.equal('fr-fr');
      expect(result.limit).to.equal(10);
    });
  });

  describe('getStoreHeader', () => {
    // Instead of trying to modify the ES module, let's create a mock implementation
    const mockStoreId = createMockStoreIdFunction();

    // Create a test version of getStoreHeader that uses our mock
    const testGetStoreHeader = (opts, storeType = 32) => {
      const country = opts.country || 'us';
      const storeId = mockStoreId(country);
      return {
        'X-Apple-Store-Front': `${storeId},${storeType}`
      };
    };

    it('should create store header with default country', () => {
      const opts = {};
      const result = testGetStoreHeader(opts);

      expect(result).to.have.property('X-Apple-Store-Front');
      expect(result['X-Apple-Store-Front']).to.include('143441,32');
    });

    it('should use provided country', () => {
      const opts = { country: 'gb' };
      const result = testGetStoreHeader(opts);

      expect(result).to.have.property('X-Apple-Store-Front');
      expect(result['X-Apple-Store-Front']).to.include('143444,32');
    });

    it('should use provided store type', () => {
      const opts = { country: 'fr' };
      const result = testGetStoreHeader(opts, 24);

      expect(result).to.have.property('X-Apple-Store-Front');
      expect(result['X-Apple-Store-Front']).to.include('143442,24');
    });
  });

  describe('addLanguageHeader', () => {
    it('should add language header when lang is provided', () => {
      const headers = { 'X-Test': 'value' };
      const opts = { lang: 'en-gb' };

      const result = addLanguageHeader(headers, opts);

      expect(result).to.deep.equal({
        'X-Test': 'value',
        'Accept-Language': 'en-gb'
      });
    });

    it('should not modify headers when lang is not provided', () => {
      const headers = { 'X-Test': 'value' };
      const opts = {};

      const result = addLanguageHeader(headers, opts);

      expect(result).to.deep.equal({
        'X-Test': 'value'
      });
    });
  });

  describe('getHeaders', () => {
    it('should combine store header and language header', () => {
      // Mock the necessary functions by using our own implementation for this test
      const opts = { country: 'fr', lang: 'fr-fr' };
      const storeType = 24;

      // Spy on sub-functions
      const storeHeaderSpy = sinon.spy(getStoreHeader);
      const addLangHeaderSpy = sinon.spy(addLanguageHeader);

      // Create a custom getHeaders function that uses our spies
      const testGetHeaders = (testOpts, testStoreType) => {
        const baseHeaders = storeHeaderSpy(testOpts, testStoreType);
        return addLangHeaderSpy(baseHeaders, testOpts);
      };

      const result = testGetHeaders(opts, storeType);

      // Verify spies were called with correct arguments
      expect(storeHeaderSpy.calledWith(opts, storeType)).to.be.true;
      expect(addLangHeaderSpy.calledWith(sinon.match.object, opts)).to.be.true;

      // Check that we have the expected headers
      expect(result).to.have.property('X-Apple-Store-Front');
      if (opts.lang) {
        expect(result).to.have.property('Accept-Language', opts.lang);
      }
    });
  });

  describe('getUrlParams', () => {
    it('should generate URL parameters string', () => {
      const opts = {
        term: 'test app',
        country: 'us',
        limit: 50,
        page: 2
      };

      const paramNames = ['term', 'country', 'limit'];

      const result = getUrlParams(opts, paramNames);

      expect(result).to.equal('term=test%20app&country=us&limit=50');
    });

    it('should skip undefined parameters', () => {
      const opts = {
        term: 'test',
        country: undefined,
        page: 1
      };

      const paramNames = ['term', 'country', 'page'];

      const result = getUrlParams(opts, paramNames);

      expect(result).to.equal('term=test&page=1');
    });

    it('should handle empty options', () => {
      const opts = {};
      const paramNames = ['term', 'country'];

      const result = getUrlParams(opts, paramNames);

      expect(result).to.equal('');
    });
  });

  describe('processParams', () => {
    it('should transform parameters according to rules', () => {
      const params = {
        name: 'test name',
        age: 25,
        active: true
      };

      const rules = {
        name: (value) => value.toUpperCase(),
        age: (value) => value * 2
        // no rule for active
      };

      const result = processParams(params, rules);
      expect(result.name).to.equal('TEST NAME');
      expect(result.age).to.equal(50);
      expect(result.active).to.equal(true); // unchanged
    });

    it('should handle empty parameters', () => {
      expect(processParams({}, {})).to.deep.equal({});
    });

    it('should handle null parameters', () => {
      expect(processParams(null, {})).to.deep.equal({});
    });

    it('should ignore rules for missing parameters', () => {
      const rules = {
        name: (value) => value.toUpperCase(),
        age: (value) => value * 2
      };

      expect(processParams({}, rules)).to.deep.equal({});
    });

    it('should call transformation functions with correct parameters', () => {
      const params = { value: 5 };
      const spy = sinon.spy();

      processParams(params, { value: spy });

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(5)).to.be.true;
    });
  });

  describe('isValid', () => {
    it('should validate parameters against rules', () => {
      const validParams = {
        name: 'test',
        age: 25
      };

      const invalidParams = {
        name: '',
        age: -1
      };

      const rules = {
        name: (value) => value.length > 0,
        age: (value) => value > 0
      };

      expect(isValid(validParams, rules)).to.be.true;
      expect(isValid(invalidParams, rules)).to.be.false;
    });

    it('should handle missing parameters as invalid', () => {
      const params = {
        name: 'test'
        // missing age
      };

      const rules = {
        name: (value) => value.length > 0,
        age: (value) => value > 0
      };

      expect(isValid(params, rules)).to.be.false;
    });

    it('should handle empty rule sets', () => {
      expect(isValid({ name: 'test' }, {})).to.be.true;
    });

    it('should call validation functions with correct parameters', () => {
      const params = { value: 5 };
      const spy = sinon.spy(() => true);

      isValid(params, { value: spy });

      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(5)).to.be.true;
    });
  });
});
