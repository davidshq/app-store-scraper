import * as R from 'ramda';
import * as common from './common.js';
import c from './constants.js';

/**
 * Extracts the app URL from the link attributes
 * @param {Object} app - App data from iTunes API
 * @returns {string|undefined} The app's URL or undefined if not found
 */
function parseLink (app) {
  if (app.link) {
    const linkArray = Array.isArray(app.link) ? app.link : [app.link];
    const link = linkArray.find(link => link.attributes.rel === 'alternate');
    return link && link.attributes.href;
  }
  return undefined;
}

/**
 * Normalizes app data from the list API format
 * @param {Object} app - Raw app data from iTunes list API
 * @returns {Object} Cleaned app data with consistent properties
 */
function cleanApp (app) {
  let developerUrl, developerId;
  if (app['im:artist'].attributes) {
    developerUrl = app['im:artist'].attributes.href;

    if (app['im:artist'].attributes.href.includes('/id')) {
      // some non developer urls can sneak in here
      // e.g. href: 'https://itunes.apple.com/us/artist/sling-tv-llc/959665097?mt=8&uo=2'
      developerId = app['im:artist'].attributes.href.split('/id')[1].split('?mt')[0];
    }
  }

  const price = parseFloat(app['im:price'].attributes.amount);
  return {
    id: app.id.attributes['im:id'],
    appId: app.id.attributes['im:bundleId'],
    title: app['im:name'].label,
    icon: app['im:image'][app['im:image'].length - 1].label,
    url: parseLink(app),
    price,
    currency: app['im:price'].attributes.currency,
    free: price === 0,
    description: app.summary ? app.summary.label : undefined,
    developer: app['im:artist'].label,
    developerUrl,
    developerId,
    genre: app.category.attributes.label,
    genreId: app.category.attributes['im:id'],
    released: app['im:releaseDate'].label
  };
}

/**
 * Creates a function to process API results based on provided options
 * @param {Object} opts - Request options
 * @returns {Function} Function that processes API results
 */
function processResults (opts) {
  return function (results) {
    const apps = results.feed.entry;

    if (opts.fullDetail) {
      const ids = apps.map((app) => app.id.attributes['im:id']);
      return common.lookup(ids, 'id', opts.country, opts.lang, opts.requestOptions, opts.throttle);
    }

    return apps.map(cleanApp);
  };
}

/**
 * Validates and normalizes options for list requests
 * @param {Object} opts - Request options to validate
 * @throws {Error} If category, collection, or num options are invalid
 */
function validate (opts) {
  if (opts.category && !R.includes(opts.category, R.values(c.category))) {
    throw Error('Invalid category ' + opts.category);
  }

  opts.collection = opts.collection || c.collection.TOP_FREE_IOS;
  if (!R.includes(opts.collection, R.values(c.collection))) {
    throw Error(`Invalid collection ${opts.collection}`);
  }

  opts.num = opts.num || 50;
  if (opts.num > 200) {
    throw Error('Cannot retrieve more than 200 apps');
  }

  opts.country = opts.country || 'us';
}

/**
 * Fetches a list of apps from the App Store
 * @param {Object} opts - The options object
 * @param {string} [opts.collection=TOP_FREE_IOS] - The collection to fetch
 * @param {number} [opts.category] - The category to fetch
 * @param {string} [opts.country='us'] - The country code
 * @param {number} [opts.num=50] - Number of apps to retrieve (max 200)
 * @param {boolean} [opts.fullDetail=false] - If true, fetches full app details
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @param {string} [opts.lang] - Language code for the response
 * @param {number} [opts.throttle] - Maximum number of requests per second
 * @returns {Promise<Array>} Promise resolving to an array of apps
 */
function list (opts) {
  return new Promise(function (resolve, reject) {
    opts = R.clone(opts || {});
    validate(opts);

    const category = opts.category ? `/genre=${opts.category}` : '';
    const storeId = common.storeId(opts.country);
    const url = `http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/${opts.collection}/${category}/limit=${opts.num}/json?s=${storeId}`;
    common.request(url, {}, opts.requestOptions)
      .then(JSON.parse)
      .then(processResults(opts))
      .then(resolve)
      .catch(reject);
  });
}

export default list;
