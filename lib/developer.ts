import type { RequestOptions } from './utils/http-client.js';
import { lookup } from './api/itunes-api.js';
import { ApiRequestOptions } from './param-utils.js';
import type { App } from './types/app-types.js';

/**
 * Options for developer data lookup
 */
export interface DeveloperOptions extends ApiRequestOptions {
  devId: string | number;
  country?: string;
  lang?: string;
  requestOptions?: RequestOptions;
  throttle?: number;
  num?: number;
  fullDetail?: boolean;
}

/**
 * Fetches information about a developer and their apps
 * @param {DeveloperOptions} opts - The options object
 * @returns {Promise<App[]>} Promise resolving to developer information and their apps
 * @throws {Error} If devId is not provided or developer is not found
 */
function developer(opts: DeveloperOptions): Promise<App[]> {
  return new Promise<App[]>(function (resolve) {
    if (!opts.devId) {
      throw Error('devId is required');
    }
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
