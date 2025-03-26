// @ts-nocheck
/**
 * Test utilities for supporting dependency injection in tests
 */

/**
 * Creates a mock app function that resolves to a test app
 *
 * @param {Object} options - Options for controlling the mock behavior
 * @param {boolean} [options.shouldFail=false] - If true, the mock will throw an error
 * @param {Object} [options.customResponse] - Custom app object to return
 * @returns {Function} - A mock app function
 */
export function createMockAppFunction(options = {}) {
  const { shouldFail = false, customResponse } = options;

  return async function mockApp(opts) {
    if (shouldFail) {
      throw new Error('App lookup failed');
    }

    return (
      customResponse || {
        id: 123456,
        appId: opts.appId || 'com.test.app',
        title: 'Test App',
        description: 'A test app',
        url: `https://apps.apple.com/app/id${123456}`,
        developer: 'Test Developer',
        developerId: 987654
      }
    );
  };
}

/**
 * Creates mock storeId function
 *
 * @param {Object} options - Options for controlling the mock behavior
 * @param {Object} [options.storeIdMap] - Custom mapping of country codes to store IDs
 * @returns {Function} - A mock storeId function
 */
export function createMockStoreIdFunction(options = {}) {
  const { storeIdMap = {} } = options;

  const defaultMap = {
    us: '143441',
    gb: '143444',
    de: '143443',
    fr: '143442'
  };

  const finalMap = { ...defaultMap, ...storeIdMap };

  return function mockStoreId(countryCode) {
    if (!countryCode) return finalMap.us;
    const code = countryCode.toLowerCase();
    return finalMap[code] || finalMap.us;
  };
}

/**
 * Creates a set of mock parameter utility functions
 *
 * @returns {Object} - The parameter utility functions
 */
export function createMockParamUtils() {
  return {
    getStoreHeader: (opts, storeType = 32) => {
      const country = opts.country || 'us';
      return {
        'X-Apple-Store-Front': `test-store-${country},${storeType}`
      };
    },

    addLanguageHeader: (headers, opts) => {
      if (opts.lang) {
        return {
          ...headers,
          'Accept-Language': opts.lang
        };
      }
      return headers;
    },

    getHeaders: function (opts, storeType) {
      const baseHeaders = this.getStoreHeader(opts, storeType);
      return this.addLanguageHeader(baseHeaders, opts);
    }
  };
}

/**
 * Creates a mock request function
 *
 * @param {Object} options - Options for controlling the mock behavior
 * @param {boolean} [options.shouldFail=false] - If true, the mock will throw an error
 * @param {number} [options.statusCode=200] - Status code to return if failing
 * @param {any} [options.response] - Custom response to return
 * @returns {Function} - A mock request function
 */
export function createMockRequestFunction(options = {}) {
  const { shouldFail = false, statusCode = 404, response } = options;

  // These parameters are included to match the real request function signature
  // but are not used in the mock implementation
  return async function mockRequest(url) {
    if (shouldFail) {
      const error = new Error('Request failed');
      error.response = { statusCode };
      throw error;
    }

    // Return custom response or a string based on the URL
    return response || `Mock response for ${url}`;
  };
}

/**
 * Creates a test function with mock dependencies injected
 *
 * @param {Function} originalFn - The original function to mock
 * @param {Object} mocks - Object containing mock dependencies
 * @returns {Function} The function with mocked dependencies
 */
export function createTestFn(originalFn, mocks = {}) {
  return (...args) => {
    return originalFn(...args, { dependencies: mocks });
  };
}
