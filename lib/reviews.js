import * as R from 'ramda';
import * as common from './common.js';
import app from './app.js';
import c from './constants.js';

/**
 * Ensures a value is an array
 * @param {*} value - Value to convert
 * @returns {Array} The value as an array
 */
function ensureArray (value) {
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
function cleanList (results) {
  const reviews = ensureArray(results.feed.entry);
  return reviews.map((review) => ({
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
const reviews = (opts) => new Promise((resolve) => {
  validate(opts);

  if (opts.id) {
    resolve(opts.id);
  } else if (opts.appId) {
    resolve(app(opts).then(app => app.id));
  }
})
  .then((id) => {
    opts = opts || {};
    opts.sort = opts.sort || c.sort.RECENT;
    opts.page = opts.page || 1;
    opts.country = opts.country || 'us';

    const url = `https://itunes.apple.com/${opts.country}/rss/customerreviews/page=${opts.page}/id=${id}/sortby=${opts.sort}/json`;
    return common.request(url, {}, opts.requestOptions);
  })
  .then(JSON.parse)
  .then(cleanList);

/**
 * Validates the options for reviews requests
 * @param {Object} opts - Options to validate
 * @throws {Error} If id/appId is missing or other options are invalid
 */
function validate (opts) {
  if (!opts.id && !opts.appId) {
    throw Error('Either id or appId is required');
  }

  if (opts.sort && !R.includes(opts.sort, R.values(c.sort))) {
    throw new Error('Invalid sort ' + opts.sort);
  }

  if (opts.page && opts.page < 1) {
    throw new Error('Page cannot be lower than 1');
  }

  if (opts.page && opts.page > 10) {
    throw new Error('Page cannot be greater than 10');
  }
}

export default reviews;
