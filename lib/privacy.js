import * as common from './common.js';

/**
 * Fetches privacy information for an app
 * @param {Object} opts - The options object
 * @param {number} opts.id - The iTunes app ID to fetch
 * @param {string} [opts.country='US'] - The country code for the App Store
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @returns {Promise<Object>} Promise resolving to app privacy details
 * @throws {Error} If id is not provided or app is not found
 */
function privacy (opts) {
  opts.country = opts.country || 'US';

  return new Promise((resolve) => {
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
    .then((html) => {
      // Extract the authorization token from the app page HTML
      // The token is URL-encoded in the page as token%22%3A%22[TOKEN]%22%7D
      const regExp = /token%22%3A%22([^%]+)%22%7D/g;
      const match = regExp.exec(html);
      const token = match[1];

      const url = `https://amp-api.apps.apple.com/v1/catalog/${opts.country}/apps/${opts.id}?platform=web&fields=privacyDetails`;
      return common.request(url, {
        'Origin': 'https://apps.apple.com',
        'Authorization': `Bearer ${token}`
      }, opts.requestOptions);
    })
    .then((json) => {
      if (json.length === 0) { throw Error('App not found (404)'); }

      return JSON.parse(json).data[0].attributes.privacyDetails;
    });
}

export default privacy;

