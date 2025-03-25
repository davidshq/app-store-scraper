import got from 'got';
import Bottleneck from 'bottleneck';
import debugModule from 'debug';
import c from './constants.js';

const debug = debugModule('app-store-scraper');

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

// Create a global limiter instance with default settings
const defaultLimiter = new Bottleneck({
  maxConcurrent: 5, // Default concurrency limit
  minTime: 200 // Minimum time between requests (ms)
});

// Get a limiter with configured rate limits
const getLimiter = (limit) => {
  if (!limit) return defaultLimiter;

  return new Bottleneck({
    maxConcurrent: limit,
    minTime: 1000 / limit // Distribute requests evenly across a second
  });
};

// Replacement for doRequest using got
const doRequest = (url, headers, requestOptions, limit) => {
  debug('Making request: %s %j %o', url, headers, requestOptions);

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
  if (requestOptions) {
    Object.keys(requestOptions).forEach(key => {
      options[key] = requestOptions[key];
    });
  }

  // Get appropriate limiter based on limit parameter
  const limiter = getLimiter(limit);
  
  // Schedule the request through the limiter
  return limiter.schedule(() => 
    got(url, options).text()
      .then(body => {
        debug('Finished request');
        return body;
      })
      .catch(error => {
        debug('Request error', error);
        
        // Format error to match the original API's error structure
        if (error.response) {
          return Promise.reject({ response: { statusCode: error.response.statusCode } });
        }
        return Promise.reject(error);
      })
  );
};

const LOOKUP_URL = 'https://itunes.apple.com/lookup';

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

function storeId (countryCode) {
  const markets = c.markets;
  const defaultStore = '143441';
  return (countryCode && markets[countryCode.toUpperCase()]) || defaultStore;
}

export { cleanApp, lookup, doRequest as request, storeId };
