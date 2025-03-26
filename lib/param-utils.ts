/**
 * Utilities for handling and normalizing API parameters
 */
import { storeId } from './utils/store-utils.js';

/**
 * Interface for API request default options
 */
export interface DefaultOptions {
  country: string;
  lang: string;
  limit: number;
  offset: number;
  page: number;
  num: number;
  [key: string]: any;
}

/**
 * Interface for API request options
 */
export interface ApiRequestOptions {
  country?: string;
  lang?: string;
  [key: string]: any;
}

/**
 * Default parameters for API requests
 * @type {Object}
 */
const DEFAULTS: DefaultOptions = {
  country: 'us',
  lang: 'en-us',
  limit: 50,
  offset: 0,
  page: 1,
  num: 50
};

/**
 * Applies default values to options object
 *
 * @param {Object} opts - Input options object
 * @param {Object} [defaults=DEFAULTS] - Default values to apply
 * @returns {Object} Options with defaults applied
 */
function applyDefaults<T extends object>(
  opts: T,
  defaults: DefaultOptions = DEFAULTS
): T & DefaultOptions {
  return { ...defaults, ...opts };
}

/**
 * Creates store header for request
 *
 * @param {Object} opts - Options object
 * @param {string} [opts.country='us'] - Country code
 * @param {number} [storeType=32] - Store type (varies by endpoint)
 * @returns {Object} Headers object with X-Apple-Store-Front
 */
function getStoreHeader(opts: ApiRequestOptions, storeType: number = 32): Record<string, string> {
  const country = opts.country || DEFAULTS.country;
  return {
    'X-Apple-Store-Front': `${storeId(country)},${storeType}`
  };
}

/**
 * Adds language headers if specified
 *
 * @param {Object} headers - Existing headers object
 * @param {Object} opts - Options object
 * @param {string} [opts.lang] - Language code
 * @returns {Object} Headers with language added if specified
 */
function addLanguageHeader(
  headers: Record<string, string>,
  opts: ApiRequestOptions
): Record<string, string> {
  if (opts.lang) {
    return {
      ...headers,
      'Accept-Language': opts.lang
    };
  }
  return headers;
}

/**
 * Creates a complete set of headers for a request
 *
 * @param {Object} opts - Options object
 * @param {number} [storeType=32] - Store type (varies by endpoint)
 * @returns {Object} Complete headers object
 */
function getHeaders(opts: ApiRequestOptions, storeType: number = 32): Record<string, string> {
  const baseHeaders = getStoreHeader(opts, storeType);
  return addLanguageHeader(baseHeaders, opts);
}

/**
 * Creates URL parameters from options
 *
 * @param {Object} opts - Options object
 * @param {Array<string>} paramNames - Names of parameters to include
 * @returns {string} URL parameters string
 */
function getUrlParams(opts: ApiRequestOptions, paramNames: string[]): string {
  return paramNames
    .filter(name => opts[name] !== undefined)
    .map(name => `${name}=${encodeURIComponent(opts[name])}`)
    .join('&');
}

export { DEFAULTS, applyDefaults, getStoreHeader, addLanguageHeader, getHeaders, getUrlParams };
