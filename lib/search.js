import * as R from 'ramda';
import * as common from './common.js';

/**
 * Base URL for iTunes app search API
 * @type {string}
 * @private
 */
const BASE_URL = 'https://search.itunes.apple.com/WebObjects/MZStore.woa/wa/search?clientApplication=Software&media=software&term=';

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
function paginate (num, page) {
  num = num || 50;
  page = page - 1 || 0;
  const pageStart = num * page;
  const pageEnd = pageStart + num;
  return R.slice(pageStart, pageEnd);
}

/**
 * Searches for apps in the App Store
 *
 * @param {Object} opts - The options object
 * @param {string} opts.term - The search term to query for
 * @param {string} [opts.country='us'] - The country code for the App Store
 * @param {string} [opts.lang='en-us'] - Language code for the response
 * @param {number} [opts.num=50] - Number of results to retrieve per page
 * @param {number} [opts.page=1] - Page number of results to retrieve (starting at 1)
 * @param {boolean} [opts.idsOnly=false] - If true, returns only the app IDs instead of the full app details
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @param {number} [opts.throttle] - Maximum number of requests per second
 * @returns {Promise<Array>} Promise resolving to an array of apps or app IDs (if idsOnly is true)
 * @throws {Error} If term is not provided
 */
function search (opts) {
  return new Promise(function (resolve, reject) {
    if (!opts.term) {
      throw Error('term is required');
    }
    const url = BASE_URL + encodeURIComponent(opts.term);
    const storeId = common.storeId(opts.country);
    const lang = opts.lang || 'en-us';

    common.request(
      url,
      {
        'X-Apple-Store-Front': `${storeId},24 t:native`,
        'Accept-Language': lang
      },
      opts.requestOptions
    )
      .then(JSON.parse)
      .then((response) => (response.bubbles[0] && response.bubbles[0].results) || [])
      .then(paginate(opts.num, opts.page))
      .then(R.pluck('id'))
      .then((ids) => {
        if (!opts.idsOnly) {
          return common.lookup(ids, 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle);
        }
        return ids;
      })
      .then(resolve)
      .catch(reject);
  });
}

export default search;
