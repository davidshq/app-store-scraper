import * as common from './common.js';
import app from './app.js';

/**
 * Base URL for iTunes app pages
 * @type {string}
 * @private
 */
const BASE_URL = 'https://itunes.apple.com/us/app/app/id';

/**
 * Fetches a list of similar apps for a given app
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
function similar (opts) {
  return new Promise(function (resolve, reject) {
    if (opts.id) {
      resolve(opts.id);
    } else if (opts.appId) {
      app(opts).then((app) => resolve(app.id)).catch(reject);
    } else {
      throw Error('Either id or appId is required');
    }
  })
    .then((id) => common.request(
      `${BASE_URL}${id}`,
      {
        'X-Apple-Store-Front': `${common.storeId(opts.country)},32`
      },
      opts.requestOptions
    ))
    .then(function (text) {
      // Check if the customersAlsoBoughtApps section exists in the response
      const index = text.indexOf('customersAlsoBoughtApps');
      if (index === -1) {
        return [];
      }
      
      // Extract the array of similar app IDs using regex
      const regExp = /customersAlsoBoughtApps":(.*?\])/g;
      const match = regExp.exec(text);
      const ids = JSON.parse(match[1]);

      // Look up the full details for each similar app
      return common.lookup(ids, 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle);
    });
}

export default similar;
