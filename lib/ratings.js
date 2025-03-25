import * as cheerio from 'cheerio';
import * as common from './common.js';
import { validateRequired } from './validators.js';
import createEndpoint from './endpoint-builder.js';
import { getHeaders, applyDefaults } from './param-utils.js';
import { notFoundError } from './error-utils.js';

/**
 * Fetches ratings HTML from iTunes
 *
 * @param {Object} opts - Options object
 * @returns {Promise<string>} - Promise resolving to HTML content
 * @private
 */
function fetchRatingsHtml (opts) {
  const normalizedOpts = applyDefaults(opts);
  const country = normalizedOpts.country;
  const idValue = normalizedOpts.id;
  const url = `https://itunes.apple.com/${country}/customer-reviews/id${idValue}?displayable-kind=11`;

  return common.request(
    url,
    getHeaders(normalizedOpts, 12),
    normalizedOpts.requestOptions
  );
}

/**
 * Validates ratings options
 *
 * @param {Object} opts - Options to validate
 * @throws {Error} If id is not provided
 * @private
 */
function validateRatingsOpts (opts) {
  validateRequired(opts, ['id'], 'id is required');
}

/**
 * Parses the HTML response to extract ratings data
 * @param {string} html - HTML content from the iTunes reviews page
 * @returns {Object} Object containing ratings count and histogram
 * @returns {number} returns.ratings - Total number of ratings
 * @returns {Object} returns.histogram - Distribution of ratings by star (1-5)
 * @private
 */
function parseRatings (html) {
  if (!html || html.length === 0) {
    throw notFoundError('App not found (404)');
  }

  const $ = cheerio.load(html);

  const ratingsMatch = $('.rating-count').text().match(/\d+/);
  const ratings = Array.isArray(ratingsMatch) ? parseInt(ratingsMatch[0]) : 0;

  const ratingsByStar = $('.vote .total').map((i, el) => parseInt($(el).text())).get();

  const histogram = ratingsByStar.reduce((acc, ratingsForStar, index) => {
    return Object.assign(acc, { [5 - index]: ratingsForStar });
  }, {});

  return { ratings, histogram };
}

/**
 * Fetches ratings data for an app
 * @param {Object} opts - The options object
 * @param {number} opts.id - The iTunes app ID to fetch
 * @param {string} [opts.country='us'] - The country code for the App Store
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @returns {Promise<Object>} Promise resolving to app ratings data
 * @throws {Error} If id is not provided or app is not found
 */
const ratings = createEndpoint({
  validate: validateRatingsOpts,

  fetch: async (opts) => {
    const html = await fetchRatingsHtml(opts);
    return parseRatings(html);
  }
});

export default ratings;
