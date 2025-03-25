import * as common from './common.js';
import ratings from './ratings.js';

/**
 * Fetches detailed information about an app
 * 
 * @param {Object} opts - The options object
 * @param {number} [opts.id] - The iTunes app ID to fetch (either this or appId is required)
 * @param {string} [opts.appId] - The app bundle ID (iOS app ID) to fetch (either this or id is required)
 * @param {string} [opts.country='us'] - The country code for the App Store
 * @param {string} [opts.lang] - The language code for localized data
 * @param {Object} [opts.requestOptions] - Options passed to the request function
 * @param {number} [opts.throttle] - Maximum number of requests per second
 * @param {boolean} [opts.ratings=false] - If true, includes ratings data with the response
 * @returns {Promise<Object>} Promise resolving to the app information
 * @throws {Error} If neither id nor appId is provided or app is not found
 */
function app (opts) {
  return new Promise(function (resolve) {
    if (!opts.id && !opts.appId) {
      throw Error('Either id or appId is required');
    }
    const idField = opts.id ? 'id' : 'bundleId';
    const idValue = opts.id || opts.appId;
    resolve(common.lookup([idValue], idField, opts.country, opts.lang, opts.requestOptions, opts.throttle));
  })
    .then((results) => {
      if (results.length === 0) {
        throw Error('App not found (404)');
      }

      const result = results[0];

      if (opts.ratings) {
        if (!opts.id) { opts.id = result.id; }
        return ratings(opts).then((ratingsResult) => Object.assign({}, result, ratingsResult));
      }

      return result;
    });
}

export default app;
