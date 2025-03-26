import * as common from './common.js';
import { validateApp } from './validators.js';
import createEndpoint from './endpoint-builder.js';
import { getHeaders, ApiRequestOptions } from './param-utils.js';
import { App } from './common.js';

/**
 * Options for similar apps lookup
 */
export interface SimilarOptions extends ApiRequestOptions {
  id: string | number;
  appId?: string;
  country?: string;
  lang?: string;
  requestOptions?: common.RequestOptions;
  throttle?: number;
  limit?: number;
}

/**
 * Dependencies for testing/mocking
 */
interface SimilarDependencies {
  requestFn?: typeof common.request;
  lookupFn?: typeof common.lookup;
}

/**
 * Base URL for iTunes app pages
 * @type {string}
 * @private
 */
const BASE_URL = 'https://itunes.apple.com/us/app/app/id';

/**
 * Fetches similar apps data from iTunes API
 *
 * @param {Object} opts - Request options
 * @param {Object} [deps] - Injected dependencies
 * @returns {Promise<string>} - Promise resolving to HTML response
 * @private
 */
function fetchSimilarApps(opts: SimilarOptions, deps: SimilarDependencies = {}): Promise<string> {
  const id = opts.id;
  const headers = getHeaders(opts, 32);

  const requestFn = deps.requestFn || common.request;

  return requestFn(`${BASE_URL}${id}`, headers, opts.requestOptions);
}

/**
 * Extracts app IDs from HTML response and looks up complete app details
 *
 * @param {string} text - HTML response from iTunes
 * @param {Object} opts - Original request options
 * @param {Object} [deps] - Injected dependencies
 * @returns {Promise<Array>} Promise resolving to array of similar apps
 * @private
 */
function extractAndLookupApps(
  text: string,
  opts: SimilarOptions,
  deps: SimilarDependencies = {}
): Promise<App[]> {
  // Check if the customersAlsoBoughtApps section exists in the response
  const index = text.indexOf('customersAlsoBoughtApps');
  if (index === -1) {
    return Promise.resolve([]);
  }

  // Extract the array of similar app IDs using regex
  const regExp = /customersAlsoBoughtApps":(.*?\])/g;
  const match = regExp.exec(text);

  if (!match || !match[1]) {
    return Promise.resolve([]);
  }

  try {
    const ids = JSON.parse(match[1]);
    // Use injected lookup function or the default
    const lookupFn = deps.lookupFn || common.lookup;

    // Look up the full details for each similar app
    return lookupFn(ids, 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle);
  } catch (_) {
    // Return empty array if parsing fails
    return Promise.resolve([]);
  }
}

/**
 * Fetches a list of similar apps for a given app
 *
 * @param {Object} opts - The options object
 * @param {number} [opts.id] - The iTunes app ID (either this or appId is required)
 * @param {string} [opts.appId] - The app bundle ID (either this or id is required)
 * @param {string} [opts.country='us'] - The country code for the App Store
 * @param {string} [opts.lang] - Language code for the response
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @param {number} [opts.throttle] - Maximum number of requests per second
 * @returns {Promise<Array>} Promise resolving to an array of similar apps
 * @throws {Error} If neither id nor appId is provided
 */
const similar = createEndpoint<SimilarOptions, App[]>({
  validate: validateApp,

  resolveId: true, // Automatically resolve appId to numeric id

  fetch: async (opts, { requestFn } = {}) => {
    const text = await fetchSimilarApps(opts, { requestFn });
    return extractAndLookupApps(text, opts, {
      lookupFn: common.lookup,
      requestFn
    });
  }
});

export default similar;
