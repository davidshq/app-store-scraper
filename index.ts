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
 * API method types
 */
type ApiMethods = {
  app: typeof app;
  list: typeof list;
  search: typeof search;
  developer: typeof developer;
  privacy: typeof privacy;
  suggest: typeof suggest;
  similar: typeof similar;
  reviews: typeof reviews;
  ratings: typeof ratings;
  versionHistory: typeof versionHistory;
};

/**
 * Collection of all API methods
 * @type {Object}
 */
const methods: ApiMethods = {
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
 * Interface for cache options
 */
export interface CacheOptions {
  primitive?: boolean;
  normalizer?: (args: any[]) => string;
  maxAge?: number;
  max?: number;
  promise?: boolean;
  profileName?: string;
}

/**
 * Method cache configuration by method name
 */
export interface MethodCacheConfig {
  [methodName: string]: CacheOptions;
}

/**
 * Type for the complete API with all methods and constants
 */
export type Api = ApiMethods &
  typeof constants & {
    memoized: (opts?: CacheOptions) => Api;
    configureCaching: (methodConfigs: MethodCacheConfig, defaultOpts?: CacheOptions) => Api;
    clearCache: (memoizedApi: ApiInstance, methodName?: string) => void;
  };

/**
 * Type for a memoized API instance
 */
export type ApiInstance = ApiMethods &
  typeof constants & {
    [key: string]: any;
  };

/**
 * Default cache configuration
 * @type {Object}
 */
const DEFAULT_CACHE_OPTIONS: CacheOptions = {
  primitive: true,
  normalizer: JSON.stringify,
  maxAge: 1000 * 60 * 5, // 5 minutes
  max: 1000 // maximum 1000 entries
};

/**
 * Creates a memoized version of the API with configurable cache settings
 *
 * @param {Object} [opts] - Memoization options
 * @param {boolean} [opts.primitive=true] - Whether to consider arguments as primitives
 * @param {Function} [opts.normalizer=JSON.stringify] - Function to create cache keys from arguments
 * @param {number} [opts.maxAge=300000] - Cache TTL in milliseconds (default: 5 minutes)
 * @param {number} [opts.max=1000] - Maximum cache size to prevent memory issues
 * @param {boolean} [opts.promise=true] - Whether to cache promise rejections
 * @param {Object} [opts.profileName] - Name of cache profile for debugging
 * @returns {Object} Memoized API methods with the same interface as the original API
 */
function memoized(opts: CacheOptions = {}): Api {
  const cacheOpts = Object.assign({}, DEFAULT_CACHE_OPTIONS, opts);

  // Create a function that applies memoization to any API function
  const doMemoize = (fn: (...args: any[]) => any, methodName: string) => {
    // Add method name as profile name for debugging if not specified
    const methodOpts = { ...cacheOpts };
    if (!methodOpts.profileName) {
      methodOpts.profileName = methodName;
    }

    return memoizee(fn, methodOpts);
  };

  // Memoize all API methods with the configured options
  const memoizedMethods: Record<string, any> = {};
  Object.keys(methods).forEach(methodName => {
    memoizedMethods[methodName] = doMemoize(methods[methodName as keyof ApiMethods], methodName);
  });

  return Object.assign({}, constants, memoizedMethods, {
    memoized,
    configureCaching,
    clearCache
  }) as unknown as Api;
}

/**
 * Applies custom cache options to specific methods
 *
 * @param {Object} methodConfigs - Configuration by method name
 * @param {Object} [defaultOpts] - Default options for all methods
 * @returns {Object} API with method-specific cache configurations
 */
function configureCaching(methodConfigs: MethodCacheConfig, defaultOpts: CacheOptions = {}): Api {
  const baseOpts = Object.assign({}, DEFAULT_CACHE_OPTIONS, defaultOpts);
  const api: Record<string, any> = {};

  // Add constants (no caching needed)
  Object.assign(api, constants);

  // Configure each method with its specific cache settings
  Object.keys(methods).forEach(methodName => {
    const methodOpts = methodConfigs[methodName] || {};
    const cacheOpts = Object.assign({}, baseOpts, methodOpts);

    api[methodName] = memoizee(methods[methodName as keyof ApiMethods], {
      ...cacheOpts,
      profileName: methodName
    });
  });

  // Add utility methods
  Object.assign(api, {
    memoized,
    configureCaching,
    clearCache
  });

  return api as unknown as Api;
}

/**
 * Clears the cache for a memoized API instance
 *
 * @param {Object} memoizedApi - A memoized API instance
 * @param {string} [methodName] - Specific method to clear cache for, or all if not specified
 */
function clearCache(memoizedApi: ApiInstance, methodName?: string): void {
  if (
    methodName &&
    memoizedApi[methodName] &&
    typeof memoizedApi[methodName].clear === 'function'
  ) {
    memoizedApi[methodName].clear();
    return;
  }

  // Clear all method caches if no specific method specified
  Object.keys(methods).forEach(name => {
    if (memoizedApi[name] && typeof memoizedApi[name].clear === 'function') {
      memoizedApi[name].clear();
    }
  });
}

/**
 * App Store Scraper API
 * @namespace api
 * @type {Object}
 * @property {Function} memoized - Creates a memoized version of the API with configurable caching
 * @property {Function} configureCaching - Creates API with method-specific cache configurations
 * @property {Function} clearCache - Clears the cache for a memoized API instance
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
const api: Api = Object.assign(
  {
    memoized,
    configureCaching,
    clearCache
  },
  constants,
  methods
) as unknown as Api;

export default api;
