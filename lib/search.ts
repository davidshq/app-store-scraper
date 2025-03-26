import * as R from 'ramda';
import { request } from './utils/http-client.js';
import { storeId } from './utils/store-utils.js';
import { lookup } from './api/itunes-api.js';
import type { App } from './types/app-types.js';
import { BaseRequestOptions, PaginationOptions } from './param-types.js';
import { validateSearch } from './validators.js';

/**
 * Options for app search
 * @interface SearchOptions
 * @extends {BaseRequestOptions} - Common request options
 * @extends {PaginationOptions} - Options for paginating results
 */
export interface SearchOptions extends BaseRequestOptions, PaginationOptions {
  /**
   * The search term to query for
   * @type {string}
   */
  term: string;
  /**
   * If true, returns only the app IDs instead of the full app details
   * @type {boolean}
   */
  idsOnly?: boolean;
}

/**
 * Internal search response format from iTunes API
 * @interface SearchApiResponse
 * @private
 */
interface SearchApiResponse {
  bubbles: Array<{
    results: Array<{
      id: number;
      [key: string]: any;
    }>;
  }>;
}

/**
 * Base URL for iTunes app search API
 * @type {string}
 * @private
 */
const BASE_URL =
  'https://search.itunes.apple.com/WebObjects/MZStore.woa/wa/search?clientApplication=Software&media=software&term=';

// TODO find out if there's a way to filter by device
// TODO refactor to allow memoization of the first request

/**
 * Slices an array to get a specific page of results
 *
 * @param {number} [num=50] - Number of results per page
 * @param {number} [page=1] - Page number (starting from 1)
 * @returns {Function} A function that slices an array to get the specified page
 * @private
 */
function paginate(num?: number, page?: number): <T>(list: T[]) => T[] {
  const numValue = num || 50;
  const pageValue = (page || 1) - 1;
  const pageStart = numValue * pageValue;
  const pageEnd = pageStart + numValue;
  return R.slice(pageStart, pageEnd);
}

/**
 * Searches for apps in the App Store
 *
 * @param {SearchOptions} opts - The options object for search
 * @param {string} opts.term - The search term to query for
 * @param {string} [opts.country='us'] - The two-letter country code to search in
 * @param {string} [opts.lang] - The language code for localized data
 * @param {number} [opts.num=50] - Number of results to return per page
 * @param {number} [opts.page=1] - Page number to return (starting from 1)
 * @param {boolean} [opts.idsOnly=false] - If true, returns only the app IDs instead of full app details
 * @param {Object} [opts.requestOptions] - Options for the underlying HTTP request
 * @param {number} [opts.throttle] - Rate limit for requests in requests per second
 * @returns {Promise<App[] | number[]>} Promise resolving to an array of apps or app IDs (if idsOnly is true)
 * @throws {Error} If term is not provided or search fails
 */
function search(opts: SearchOptions): Promise<App[] | number[]> {
  return new Promise(function (resolve, reject) {
    validateSearch(opts);

    const url = BASE_URL + encodeURIComponent(opts.term);
    const storeCode = storeId(opts.country);
    const lang = opts.lang || 'en-us';

    request(
      url,
      {
        'X-Apple-Store-Front': `${storeCode},24 t:native`,
        'Accept-Language': lang
      },
      opts.requestOptions,
      opts.throttle
    )
      .then((body: string) => JSON.parse(body) as SearchApiResponse)
      .then(response => (response.bubbles[0] && response.bubbles[0].results) || [])
      .then(paginate(opts.num, opts.page))
      .then(results => {
        const ids = results.map(result => result.id);
        return ids as number[];
      })
      .then(async ids => {
        if (!opts.idsOnly) {
          return lookup(ids, 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle);
        }
        return ids;
      })
      .then(resolve)
      .catch(reject);
  });
}

export default search;
