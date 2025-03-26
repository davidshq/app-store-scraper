import type { RequestOptions } from './utils/http-client.js';
import { lookup } from './api/itunes-api.js';
import { ApiRequestOptions } from './param-utils.js';
import type { App } from './types/app-types.js';
import { validateDeveloper } from './validators.js';

/**
 * Options for developer data lookup
 * @interface DeveloperOptions
 * @extends {ApiRequestOptions} - Common API request options
 */
export interface DeveloperOptions extends ApiRequestOptions {
  /**
   * The developer/artist ID to look up
   * @type {string|number}
   */
  devId: string | number;
  /**
   * The two-letter country code to get data from
   * @type {string}
   * @default 'us'
   */
  country?: string;
  /**
   * The language code for localized data
   * @type {string}
   */
  lang?: string;
  /**
   * Options for the underlying HTTP request
   * @type {RequestOptions}
   */
  requestOptions?: RequestOptions;
  /**
   * Rate limit for requests in requests per second
   * @type {number}
   */
  throttle?: number;
  /**
   * Number of results to return
   * @type {number}
   * @default 50
   */
  num?: number;
  /**
   * Whether to fetch full app details
   * @type {boolean}
   * @default false
   */
  fullDetail?: boolean;
}

/**
 * Fetches information about a developer and their apps
 *
 * @param {DeveloperOptions} opts - The options object for developer lookup
 * @param {string|number} opts.devId - The developer ID to look up
 * @param {string} [opts.country='us'] - The two-letter country code to get data from
 * @param {string} [opts.lang] - The language code for localized data
 * @param {Object} [opts.requestOptions] - Options for the underlying HTTP request
 * @param {number} [opts.throttle] - Rate limit for requests in requests per second
 * @param {number} [opts.num=50] - Number of results to return
 * @param {boolean} [opts.fullDetail=false] - Whether to fetch full app details
 * @returns {Promise<App[]>} Promise resolving to an array of the developer's apps
 * @throws {Error} If devId is not provided or developer is not found
 */
function developer(opts: DeveloperOptions): Promise<App[]> {
  return new Promise<App[]>(function (resolve) {
    validateDeveloper(opts);

    resolve(
      lookup([opts.devId], 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle)
    );
  }).then(results => {
    // first result is artist metadata.
    // If missing it's not a developer. If present we slice to skip it
    if (results.length === 0) {
      throw Error('Developer not found (404)');
    }

    const apps = results.slice(1);

    // Make sure developer data is present on all app entries
    if (apps.length > 0 && results[0].developerId) {
      const developer = results[0].developer;
      const developerId = results[0].developerId;

      // Ensure each app has the developer information
      return apps.map(app => ({
        ...app,
        developer: app.developer || developer,
        developerId: app.developerId || developerId
      }));
    }

    return results;
  });
}

export default developer;
