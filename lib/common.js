import got from 'got';
import Bottleneck from 'bottleneck';
import debugModule from 'debug';
import c from './constants.js';

/**
 * Debug logger instance for app-store-scraper
 */
const debug = debugModule('app-store-scraper');

/**
 * Normalizes and cleans app data returned from the iTunes API
 * @param {Object} app - Raw app data from iTunes API
 * @returns {Object} Cleaned and normalized app data
 */
function cleanApp (app) {
  return {
    id: app.trackId,
    appId: app.bundleId,
    title: app.trackName,
    url: app.trackViewUrl,
    description: app.description,
    icon: app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60,
    genres: app.genres,
    genreIds: app.genreIds,
    primaryGenre: app.primaryGenreName,
    primaryGenreId: app.primaryGenreId,
    contentRating: app.contentAdvisoryRating,
    languages: app.languageCodesISO2A,
    size: app.fileSizeBytes,
    requiredOsVersion: app.minimumOsVersion,
    released: app.releaseDate,
    updated: app.currentVersionReleaseDate || app.releaseDate,
    releaseNotes: app.releaseNotes,
    version: app.version,
    price: app.price,
    currency: app.currency,
    free: app.price === 0,
    developerId: app.artistId,
    developer: app.artistName,
    developerUrl: app.artistViewUrl,
    developerWebsite: app.sellerUrl,
    score: app.averageUserRating,
    reviews: app.userRatingCount,
    currentVersionScore: app.averageUserRatingForCurrentVersion,
    currentVersionReviews: app.userRatingCountForCurrentVersion,
    screenshots: app.screenshotUrls,
    ipadScreenshots: app.ipadScreenshotUrls,
    appletvScreenshots: app.appletvScreenshotUrls,
    supportedDevices: app.supportedDevices
  };
}

/**
 * Default global rate limiter instance
 * @type {Bottleneck}
 * @private
 */
const defaultLimiter = new Bottleneck({
  maxConcurrent: 5, // Default concurrency limit
  minTime: 200 // Minimum time between requests (ms)
});

/**
 * Gets a rate limiter with the specified configuration
 * @param {number} [limit] - Maximum number of requests per second
 * @returns {Bottleneck} A configured rate limiter instance
 */
const getLimiter = (limit) => {
  if (!limit) return defaultLimiter;

  return new Bottleneck({
    maxConcurrent: limit,
    minTime: 1000 / limit // Distribute requests evenly across a second
  });
};

/**
 * Creates request options by merging defaults with custom options
 * @param {Object} [headers] - HTTP headers to include in the request
 * @param {Object} [customOptions] - Custom request options to merge with defaults
 * @returns {Object} The merged request options
 */
const createRequestOptions = (headers, customOptions) => {
  const options = {
    headers: headers || {},
    retry: {
      limit: 2, // Retry failed requests twice
      methods: ['GET'] // Only retry GET requests
    },
    timeout: {
      request: 30000 // 30 second timeout
    }
  };

  // Add other request options if provided
  if (customOptions) {
    Object.keys(customOptions).forEach(key => {
      options[key] = customOptions[key];
    });
  }

  return options;
};

/**
 * Factory function that creates a request function with configurable dependencies
 * This makes testing easier by allowing dependency injection
 * @param {Function} [httpClient=got] - HTTP client used to make requests
 * @param {Function} [limiterFactory=getLimiter] - Factory function for rate limiters
 * @returns {Function} A request function that uses the provided dependencies
 */
const createRequester = (httpClient = got, limiterFactory = getLimiter) => {
  /**
   * Makes an HTTP request with rate limiting
   * @param {string} url - The URL to request
   * @param {Object} [headers] - HTTP headers for the request
   * @param {Object} [requestOptions] - Additional request options
   * @param {number} [limit] - Rate limit for requests
   * @returns {Promise<string>} Promise resolving to the response body
   */
  return (url, headers, requestOptions, limit) => {
    debug('Making request: %s %j %o', url, headers, requestOptions);

    const options = createRequestOptions(headers, requestOptions);

    // Get appropriate limiter based on limit parameter
    const limiter = limiterFactory(limit);

    // Schedule the request through the limiter
    return limiter.schedule(() =>
      httpClient(url, options).text()
        .then(body => {
          debug('Finished request');
          return body;
        })
        .catch(error => {
          debug('Request error', error);

          // Format error to match the original API's error structure
          if (error.response) {
            const apiError = new Error(`Request failed with status code ${error.response.statusCode}`);
            apiError.response = { statusCode: error.response.statusCode };
            return Promise.reject(apiError);
          }
          return Promise.reject(error);
        })
    );
  };
};

/**
 * Default request function created using createRequester
 * @type {Function}
 * @private
 */
const doRequest = createRequester();

/**
 * iTunes lookup API endpoint URL
 * @type {string}
 * @private
 */
const LOOKUP_URL = 'https://itunes.apple.com/lookup';

/**
 * Looks up app details from the iTunes API
 * @param {Array<string|number>} ids - The app IDs to look up
 * @param {string} [idField='id'] - The field to search by ('id' or 'bundleId')
 * @param {string} [country='us'] - The country code for the App Store
 * @param {string} [lang] - The language code for localized data
 * @param {Object} [requestOptions] - Additional request options
 * @param {number} [limit] - Rate limit for requests
 * @returns {Promise<Array<Object>>} Promise resolving to an array of app data
 */
function lookup (ids, idField, country, lang, requestOptions, limit) {
  idField = idField || 'id';
  country = country || 'us';
  const langParam = lang ? `&lang=${lang}` : '';
  const joinedIds = ids.join(',');
  const url = `${LOOKUP_URL}?${idField}=${joinedIds}&country=${country}&entity=software${langParam}`;
  return doRequest(url, {}, requestOptions, limit)
    .then(JSON.parse)
    .then((res) => res.results.filter(function (app) {
      return typeof app.wrapperType === 'undefined' || app.wrapperType === 'software';
    }))
    .then((res) => res.map(cleanApp));
}

/**
 * Gets the store ID for a given country code
 * @param {string} countryCode - The two-letter country code
 * @returns {string} The corresponding iTunes store ID
 */
function storeId (countryCode) {
  const markets = c.markets;
  const defaultStore = '143441';
  return (countryCode && markets[countryCode.toUpperCase()]) || defaultStore;
}

/**
 * Makes a standardized request to an App Store API endpoint
 *
 * @param {Object} config - Request configuration
 * @param {string} config.url - The URL to request
 * @param {Object} [config.headers={}] - HTTP headers for the request
 * @param {Object} [config.requestOptions] - Additional request options from opts
 * @param {number} [config.limit] - Rate limit for requests from opts
 * @returns {Promise<any>} Promise resolving to the response (parsed if JSON)
 */
function makeRequest (config) {
  const { url, headers = {}, requestOptions, limit } = config;
  const shouldParseJson = config.parseJson !== false;

  debug('Making request: %s %j %o', url, headers, requestOptions);

  const options = createRequestOptions(headers, requestOptions);
  const limiter = getLimiter(limit);

  return limiter.schedule(() =>
    got(url, options)
      .text()
      .then(body => {
        debug('Finished request');
        if (shouldParseJson) {
          try {
            return JSON.parse(body);
          } catch (e) {
            debug('Failed to parse JSON', e);
            return body;
          }
        }
        return body;
      })
      .catch(error => {
        debug('Request error', error);

        // Format error to match the original API's error structure
        if (error.response) {
          const apiError = new Error(`Request failed with status code ${error.response.statusCode}`);
          apiError.response = { statusCode: error.response.statusCode };
          return Promise.reject(apiError);
        }
        return Promise.reject(error);
      })
  );
}

export {
  cleanApp,
  lookup,
  doRequest as request,
  makeRequest,
  storeId,
  // Expose these additional functions for testing
  getLimiter,
  createRequester,
  createRequestOptions
};
