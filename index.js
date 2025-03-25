import * as R from 'ramda';
import memoizee from 'memoizee';
import constants from './lib/constants.js';

import app from './lib/app.js';
import list from './lib/list.js';
import search from './lib/search.js';
import developer from './lib/developer.js';
import privacy from './lib/privacy.js';
import suggest from './lib/suggest.js';
import similar from './lib/similar.js';
import reviews from './lib/reviews.js';
import ratings from './lib/ratings.js';
import versionHistory from './lib/version-history.js';

/**
 * Collection of all API methods
 * @type {Object}
 */
const methods = {
  app,
  list,
  search,
  developer,
  privacy,
  suggest,
  similar,
  reviews,
  ratings,
  versionHistory
};

/**
 * Creates a memoized version of the API with configurable cache settings
 * @param {Object} [opts] - Memoization options
 * @param {boolean} [opts.primitive=true] - Whether to consider arguments as primitives
 * @param {Function} [opts.normalizer=JSON.stringify] - Function to create cache keys from arguments
 * @param {number} [opts.maxAge=300000] - Cache TTL in milliseconds (default: 5 minutes)
 * @param {number} [opts.max=1000] - Maximum cache size to prevent memory issues
 * @returns {Object} Memoized API methods with the same interface as the original API
 */
function memoized (opts) {
  const cacheOpts = Object.assign({
    primitive: true,
    normalizer: JSON.stringify,
    // TODO: Make this configurable
    maxAge: 1000 * 60 * 5, // cache for 5 minutes
    // TODO: Make this configurable
    max: 1000 // save up to 1k results to avoid memory issues
  }, opts);
  const doMemoize = (fn) => memoizee(fn, cacheOpts);
  return Object.assign({}, constants, R.map(doMemoize, methods));
}

/**
 * App Store Scraper API
 * @namespace api
 * @type {Object}
 * @property {Function} memoized - Creates a memoized version of the API with configurable caching
 * @property {Object} constants - App Store constants (collections, categories, etc.)
 * @property {Function} app - Get app details by ID or App ID
 * @property {Function} list - Get apps from a specific collection
 * @property {Function} search - Search for apps
 * @property {Function} developer - Get apps by developer ID
 * @property {Function} privacy - Get app privacy details
 * @property {Function} suggest - Get app name suggestions
 * @property {Function} similar - Get similar apps
 * @property {Function} reviews - Get app reviews
 * @property {Function} ratings - Get app ratings
 * @property {Function} versionHistory - Get app version history
 */
const api = Object.assign({memoized}, constants, methods);

export default api;
