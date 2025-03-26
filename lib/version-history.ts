import * as common from './common.js';
import { ApiRequestOptions } from './param-utils.js';

/**
 * Options for version history lookup
 */
export interface VersionHistoryOptions extends ApiRequestOptions {
  id: string | number;
  country?: string;
  requestOptions?: common.RequestOptions;
}

/**
 * Version history entry format
 */
export interface VersionHistoryEntry {
  versionDisplay: string;
  releaseDate: string;
  releaseNotes?: string;
}

/**
 * Internal API response format
 */
interface VersionHistoryApiResponse {
  data: Array<{
    attributes: {
      platformAttributes: {
        ios: {
          versionHistory: VersionHistoryEntry[];
        };
      };
    };
  }>;
}

/**
 * Fetches the version history for an app
 * @param {Object} opts - The options object
 * @param {number} opts.id - The iTunes app ID to fetch
 * @param {string} [opts.country='US'] - The country code for the App Store
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @returns {Promise<Array>} Promise resolving to an array of version history entries
 * @throws {Error} If id is not provided or app is not found
 */
function versionHistory(opts: VersionHistoryOptions): Promise<VersionHistoryEntry[]> {
  opts.country = opts.country || 'US';

  return new Promise<void>(resolve => {
    if (opts.id) {
      resolve();
    } else {
      throw Error('Either id or appId is required');
    }
  })
    .then(() => {
      const tokenUrl = `https://apps.apple.com/${opts.country}/app/id${opts.id}`;
      return common.request(tokenUrl, {}, opts.requestOptions);
    })
    .then(html => {
      // Extract the authorization token from the app page HTML
      // The token is URL-encoded in the page as token%22%3A%22[TOKEN]%22%7D
      const regExp = /token%22%3A%22([^%]+)%22%7D/g;
      const match = regExp.exec(html);

      if (!match || !match[1]) {
        throw Error('Could not retrieve authorization token');
      }

      const token = match[1];

      const url = `https://amp-api.apps.apple.com/v1/catalog/${opts.country}/apps/${opts.id}?platform=web&extend=versionHistory&additionalPlatforms=appletv,ipad,iphone,mac,realityDevice`;
      return common.request(
        url,
        {
          Origin: 'https://apps.apple.com',
          Authorization: `Bearer ${token}`
        },
        opts.requestOptions
      );
    })
    .then(json => {
      if (json.length === 0) {
        throw Error('App not found (404)');
      }

      const parsedJson = JSON.parse(json) as VersionHistoryApiResponse;
      return parsedJson.data[0].attributes.platformAttributes.ios.versionHistory;
    });
}

export default versionHistory;
