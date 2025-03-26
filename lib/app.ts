import { lookup } from './api/itunes-api.js';
import ratings, { RatingsOptions } from './ratings.js';
import { validateApp } from './validators.js';
import type { App } from './types/app-types.js';
import { AppIdentifierOptions, BaseRequestOptions, normalizeAppIdentifier } from './param-types.js';

/**
 * Options for app lookup
 */
export interface AppOptions extends AppIdentifierOptions, BaseRequestOptions {
  /** Whether to include ratings data with the response */
  ratings?: boolean;
}

/**
 * Fetches detailed information about an app
 *
 * @param {AppOptions} opts - The options object
 * @returns {Promise<App>} Promise resolving to the app information
 * @throws {Error} If neither id nor appId is provided or app is not found
 */
function app(opts: AppOptions): Promise<App> {
  return new Promise<App[]>(function (resolve) {
    validateApp(opts);

    const { idField, idValue } = normalizeAppIdentifier(opts);

    resolve(
      lookup([idValue], idField, opts.country, opts.lang, opts.requestOptions, opts.throttle)
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
