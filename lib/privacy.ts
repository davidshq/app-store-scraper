import * as common from './common.js';
import { ApiRequestOptions } from './param-utils.js';

/**
 * Options for privacy data lookup
 */
export interface PrivacyOptions extends ApiRequestOptions {
  id: string | number;
  country?: string;
  requestOptions?: common.RequestOptions;
}

/**
 * Privacy detail type mappings
 */
export type PrivacyType = 'DATA_LINKED_TO_YOU' | 'DATA_USED_TO_TRACK_YOU' | 'DATA_NOT_COLLECTED';

/**
 * Privacy detail category
 */
export interface PrivacyDetailCategory {
  identifier: string;
  dataTypes: string[];
  purposes?: string[];
}

/**
 * Privacy detail type
 */
export interface PrivacyDetailType {
  identifier: PrivacyType;
  description: string;
  categories: PrivacyDetailCategory[];
}

/**
 * Privacy details response
 */
export interface PrivacyDetails {
  managePrivacyChoicesUrl?: string;
  privacyTypes: PrivacyDetailType[];
}

/**
 * Internal API response format
 */
interface PrivacyApiResponse {
  data: Array<{
    attributes: {
      privacyDetails: PrivacyDetails;
    };
  }>;
}

/**
 * Fetches privacy information for an app
 * @param {Object} opts - The options object
 * @param {number} opts.id - The iTunes app ID to fetch
 * @param {string} [opts.country='US'] - The country code for the App Store
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @returns {Promise<Object>} Promise resolving to app privacy details
 * @throws {Error} If id is not provided or app is not found
 */
function privacy(opts: PrivacyOptions): Promise<PrivacyDetails> {
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

      const url = `https://amp-api.apps.apple.com/v1/catalog/${opts.country}/apps/${opts.id}?platform=web&fields=privacyDetails`;
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

      const parsedJson = JSON.parse(json) as PrivacyApiResponse;
      return parsedJson.data[0].attributes.privacyDetails;
    });
}

export default privacy;
