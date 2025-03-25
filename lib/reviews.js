import * as common from './common.js';
import app from './app.js';
import c from './constants.js';
import { validateReviews } from './validators.js';

/**
 * Ensures a value is an array
 * @param {*} value - Value to convert
 * @returns {Array} The value as an array
 */
function ensureArray(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

/**
 * Normalizes review data from the iTunes API format
 * @param {Object} results - Raw reviews data from iTunes API
 * @returns {Array<Object>} Array of normalized review objects
 */
function cleanList(results) {
  const reviews = ensureArray(results.feed.entry);
  return reviews.map(review => ({
    id: review.id.label,
    userName: review.author.name.label,
    userUrl: review.author.uri.label,
    version: review['im:version'].label,
    score: parseInt(review['im:rating'].label),
    title: review.title.label,
    text: review.content.label,
    url: review.link.attributes.href,
    updated: review.updated.label
  }));
}

/**
 * Fetches reviews for an app
 * @param {Object} opts - The options object
 * @param {number} [opts.id] - The iTunes app ID (either this or appId is required)
 * @param {string} [opts.appId] - The app bundle ID (either this or id is required)
 * @param {string} [opts.country='us'] - The country code
 * @param {string} [opts.sort=RECENT] - The sort order (see constants.sort)
 * @param {number} [opts.page=1] - Page number of reviews to fetch (1-10)
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @returns {Promise<Array>} Promise resolving to an array of reviews
 */
const reviews = opts => {
  validateReviews(opts);

  // Resolve the app ID
  const getAppId = opts.id ? Promise.resolve(opts.id) : app(opts).then(appData => appData.id);

  return getAppId
    .then(id => {
      const options = {
        sort: opts.sort || c.sort.RECENT,
        page: opts.page || 1,
        country: opts.country || 'us'
      };

      const url = `https://itunes.apple.com/${options.country}/rss/customerreviews/page=${options.page}/id=${id}/sortby=${options.sort}/json`;
      return common.request(url, {}, opts.requestOptions);
    })
    .then(JSON.parse)
    .then(cleanList);
};

export default reviews;
