import * as common from './common.js';
import ratings, { RatingsOptions } from './ratings.js';
import { validateApp } from './validators.js';
import { App } from './common.js';

/**
 * Options for app lookup
 */
export interface AppOptions {
  id?: string | number;
  appId?: string;
  country?: string;
  lang?: string;
  requestOptions?: common.RequestOptions;
  throttle?: number;
  ratings?: boolean;
}

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
function app(opts: AppOptions): Promise<App> {
  return new Promise<App[]>(function (resolve) {
    validateApp(opts);
    const idField = opts.id ? 'id' : 'bundleId';
    const idValue = opts.id || opts.appId;

    if (!idValue) {
      throw Error('Either id or appId is required');
    }

    resolve(
      common.lookup([idValue], idField, opts.country, opts.lang, opts.requestOptions, opts.throttle)
    );
  }).then(results => {
    if (results.length === 0) {
      throw Error('App not found (404)');
    }

    const result = results[0];

    if (opts.ratings) {
      // Create a RatingsOptions object with a required id
      const ratingsOpts: RatingsOptions = {
        id: opts.id || result.id,
        country: opts.country,
        requestOptions: opts.requestOptions
      };

      // Handle potential errors in ratings fetch gracefully
      return ratings(ratingsOpts)
        .then(ratingsResult => Object.assign({}, result, ratingsResult))
        .catch(err => {
          console.warn(`Failed to fetch ratings: ${err.message}. Using default values.`);
          // Return app with default/empty ratings data
          return Object.assign({}, result, {
            ratings: 0,
            histogram: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
          });
        });
    }

    return result;
  });
}

export default app;
