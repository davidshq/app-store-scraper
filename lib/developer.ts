import * as common from './common.js';
import { ApiRequestOptions } from './param-utils.js';
import { App } from './common.js';

/**
 * Options for developer data lookup
 */
export interface DeveloperOptions extends ApiRequestOptions {
  devId: string | number;
  country?: string;
  lang?: string;
  requestOptions?: common.RequestOptions;
  throttle?: number;
  num?: number;
  fullDetail?: boolean;
}

/**
 * Fetches information about a developer and their apps
 * @param {Object} opts - The options object
 * @param {number} opts.devId - The iTunes developer ID to fetch
 * @param {string} [opts.country='us'] - The country code for the App Store
 * @param {string} [opts.lang] - Language code for the response
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @param {number} [opts.throttle] - Maximum number of requests per second
 * @returns {Promise<Array>} Promise resolving to developer information and their apps
 * @throws {Error} If devId is not provided or developer is not found
 */
function developer(opts: DeveloperOptions): Promise<App[]> {
  return new Promise<App[]>(function (resolve) {
    if (!opts.devId) {
      throw Error('devId is required');
    }
    resolve(
      common.lookup([opts.devId], 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle)
    );
  }).then(results => {
    // first result is artist metadata.
    // If missing it's not a developer. If present we slice to skip it
    if (results.length === 0) {
      throw Error('Developer not found (404)');
    }

    return results;
  });
}

export default developer;
