import * as R from 'ramda';
import { request } from './utils/http-client.js';
import { storeId } from './utils/store-utils.js';
import { lookup } from './api/itunes-api.js';
import type { App } from './types/app-types.js';
import { BaseRequestOptions, PaginationOptions } from './param-types.js';
import { validateSearch } from './validators.js';

/**
 * Options for app search
 */
export interface SearchOptions extends BaseRequestOptions, PaginationOptions {
  /** The search term to query for */
  term: string;
  /** If true, returns only the app IDs instead of the full app details */
  idsOnly?: boolean;
}

/**
 * Internal search response format
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
 * @param {SearchOptions} opts - The options object
 * @returns {Promise<App[] | number[]>} Promise resolving to an array of apps or app IDs (if idsOnly is true)
 * @throws {Error} If term is not provided
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
