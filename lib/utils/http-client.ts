/**
 * HTTP client utilities for making requests to external APIs
 */
import got from 'got';
import type { Method } from 'got';
import debugModule from 'debug';
import { getLimiter, scheduleWithRateLimit } from './rate-limiter.js';

/**
 * Debug logger instance for app-store-scraper
 */
const debug = debugModule('app-store-scraper:http');

/**
 * Interface for request options
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  retry?: {
    limit: number;
    methods: Method[];
  };
  timeout?: {
    request: number;
  };
  [key: string]: any;
}

/**
 * Creates request options by merging defaults with custom options
 * @param {Record<string, string>} [headers] - HTTP headers to include in the request
 * @param {RequestOptions} [customOptions] - Custom request options to merge with defaults
 * @returns {RequestOptions} The merged request options
 */
export function createRequestOptions(
  headers?: Record<string, string>,
  customOptions?: RequestOptions
): RequestOptions {
  const options: RequestOptions = {
    headers: headers || {},
    retry: {
      limit: 2, // Retry failed requests twice
      methods: ['GET' as Method] // Only retry GET requests
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
}

/**
 * Factory function that creates a request function with configurable dependencies
 * This makes testing easier by allowing dependency injection
 * @param {Function} [httpClient=got] - HTTP client used to make requests
 * @param {Function} [limiterFactory=getLimiter] - Factory function for rate limiters
 * @returns {Function} A request function that uses the provided dependencies
 */
export function createRequester(
  httpClient: typeof got = got,
  limiterFactory: typeof getLimiter = getLimiter
): (
  url: string,
  headers?: Record<string, string>,
  requestOptions?: RequestOptions,
  limit?: number
) => Promise<string> {
  /**
   * Makes an HTTP request with rate limiting
   * @param {string} url - The URL to request
   * @param {Object} [headers] - HTTP headers for the request
   * @param {Object} [requestOptions] - Additional request options
   * @param {number} [limit] - Rate limit for requests
   * @returns {Promise<string>} Promise resolving to the response body
   */
  return (
    url: string,
    headers?: Record<string, string>,
    requestOptions?: RequestOptions,
    limit?: number
  ): Promise<string> => {
    debug('Making request: %s %j %o', url, headers, requestOptions);

    const options = createRequestOptions(headers, requestOptions);

    // Create request function
    const makeRequestFn = async () => {
      return httpClient(url, options)
        .text()
        .then(body => {
          debug('Finished request');
          return body;
        })
        .catch(error => {
          debug('Request error', error);

          // Format error to match the original API's error structure
          if (error.response) {
            const apiError = new Error(
              `Request failed with status code ${error.response.statusCode}`
            );
            (apiError as any).response = { statusCode: error.response.statusCode };
            return Promise.reject(apiError);
          }
          return Promise.reject(error);
        });
    };

    // Schedule the request through the rate limiter
    const limiter = limiterFactory(limit);
    return scheduleWithRateLimit(makeRequestFn, limit);
  };
}

/**
 * Makes an HTTP request with rate limiting
 * @param {string} url - The URL to request
 * @param {Record<string, string>} [headers] - HTTP headers for the request
 * @param {RequestOptions} [requestOptions] - Additional request options
 * @param {number} [limit] - Rate limit for requests (requests per second)
 * @returns {Promise<string>} Promise resolving to the response body
 */
export async function request(
  url: string,
  headers?: Record<string, string>,
  requestOptions?: RequestOptions,
  limit?: number
): Promise<string> {
  debug('Making request: %s %j %o', url, headers, requestOptions);

  const options = createRequestOptions(headers, requestOptions);

  const makeRequest = async () => {
    try {
      const response = await got(url, options);
      return response.body;
    } catch (error) {
      debug('Request error: %o', error);
      throw error;
    }
  };

  return scheduleWithRateLimit(makeRequest, limit);
}

/**
 * Request configuration object
 */
export interface RequestConfig {
  url: string;
  headers?: Record<string, string>;
  requestOptions?: RequestOptions;
  limit?: number;
  parseJson?: boolean;
}

/**
 * Makes a request with the given configuration
 * @param {RequestConfig} config - Request configuration
 * @returns {Promise<any>} Promise resolving to the response (string or parsed JSON)
 */
export async function makeRequest(config: RequestConfig): Promise<any> {
  const response = await request(config.url, config.headers, config.requestOptions, config.limit);

  if (config.parseJson) {
    try {
      return JSON.parse(response);
    } catch (e) {
      console.error('Error parsing JSON response', e);
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      throw new Error(`Error parsing JSON response: ${errorMessage}`);
    }
  }

  return response;
}
