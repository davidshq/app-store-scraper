import { request } from './utils/http-client.js';
import { lookup } from './api/itunes-api.js';
import { validateApp } from './validators.js';
import createEndpoint from './endpoint-builder.js';
import { getHeaders } from './param-utils.js';
import type { App } from './types/app-types.js';
import { AppIdentifierOptions, BaseRequestOptions } from './param-types.js';

/**
 * Options for similar apps lookup
 */
export interface SimilarOptions extends AppIdentifierOptions, BaseRequestOptions {
  /** Maximum number of similar apps to return */
  limit?: number;
}

/**
 * Dependencies for testing/mocking
 */
interface SimilarDependencies {
  requestFn?: typeof request;
  lookupFn?: typeof lookup;
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
 * @param {SimilarOptions} opts - Request options
 * @param {SimilarDependencies} [deps] - Injected dependencies
 * @returns {Promise<string>} - Promise resolving to HTML response
 * @private
 */
function fetchSimilarApps(opts: SimilarOptions, deps: SimilarDependencies = {}): Promise<string> {
  const id = opts.id;
  const headers = getHeaders(opts, 32);

  const requestFn = deps.requestFn || request;

  return requestFn(`${BASE_URL}${id}`, headers, opts.requestOptions, opts.throttle);
}

/**
 * Extracts app IDs from HTML response and looks up complete app details
 *
 * @param {string} text - HTML response from iTunes
 * @param {SimilarOptions} opts - Original request options
 * @param {SimilarDependencies} [deps] - Injected dependencies
 * @returns {Promise<App[]>} Promise resolving to array of similar apps
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
    const lookupFn = deps.lookupFn || lookup;

    // Look up the full details for each similar app
    return lookupFn(ids, 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle);
  } catch {
    // Return empty array if parsing fails
    return Promise.resolve([]);
  }
}

/**
 * Fetches a list of similar apps for a given app
 *
 * @param {SimilarOptions} opts - The options object
 * @returns {Promise<App[]>} Promise resolving to an array of similar apps
 * @throws {Error} If neither id nor appId is provided
 */
const similar = createEndpoint<SimilarOptions, App[]>({
  validate: validateApp,

  resolveId: true, // Automatically resolve appId to numeric id

  fetch: async (opts, { requestFn } = {}) => {
    const text = await fetchSimilarApps(opts, { requestFn });
    return extractAndLookupApps(text, opts, {
      lookupFn: lookup,
      requestFn
    });
  }
});

export default similar;
