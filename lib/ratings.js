import * as cheerio from 'cheerio';
import * as common from './common.js';

/**
 * Fetches ratings data for an app
 * @param {Object} opts - The options object
 * @param {number} opts.id - The iTunes app ID to fetch
 * @param {string} [opts.country='us'] - The country code for the App Store
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @returns {Promise<Object>} Promise resolving to app ratings data
 * @throws {Error} If id is not provided or app is not found
 */
function ratings (opts) {
  return new Promise(function (resolve) {
    if (!opts.id) {
      throw Error('id is required');
    }

    const country = opts.country || 'us';
    const storeFront = common.storeId(opts.country);
    const idValue = opts.id;
    const url = `https://itunes.apple.com/${country}/customer-reviews/id${idValue}?displayable-kind=11`;

    resolve(common.request(url, {
      'X-Apple-Store-Front': `${storeFront},12`
    }, opts.requestOptions));
  })
    .then((html) => {
      if (html.length === 0) {
        throw Error('App not found (404)');
      }

      return parseRatings(html);
    });
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
  const $ = cheerio.load(html);

  const ratingsMatch = $('.rating-count').text().match(/\d+/);
  const ratings = Array.isArray(ratingsMatch) ? parseInt(ratingsMatch[0]) : 0;

  const ratingsByStar = $('.vote .total').map((i, el) => parseInt($(el).text())).get();

  const histogram = ratingsByStar.reduce((acc, ratingsForStar, index) => {
    return Object.assign(acc, { [5 - index]: ratingsForStar });
  }, {});

  return { ratings, histogram };
}

export default ratings;
