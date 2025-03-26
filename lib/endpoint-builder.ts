/**
 * Utility to create standardized API endpoint functions
 */
import type { RequestOptions } from './utils/http-client.js';
import { request } from './utils/http-client.js';

// Use dynamic import to avoid circular dependency issues
let appModule: any = null;

/**
 * Interface for endpoint configuration
 */
export interface EndpointConfig<T, R> {
  /**
   * Function that performs the actual API request
   */
  fetch: (opts: T, dependencies?: { requestFn?: typeof request }) => Promise<R>;

  /**
   * Function to validate the options
   */
  validate?: (opts: T) => void;

  /**
   * Function to transform the response data
   */
  transform?: (data: any) => R;

  /**
   * Whether to resolve id/appId to numeric id if needed
   */
  resolveId?: boolean;
}

/**
 * Interface for endpoint dependencies
 */
export interface EndpointDependencies {
  /**
   * App function to use (defaults to app import)
   */
  appFunction?: (opts: any) => Promise<any>;

  /**
   * Request function to use (defaults to request)
   */
  requestFunction?: typeof request;
}

/**
 * Creates a standardized endpoint function with consistent error handling and request patterns
 *
 * @param {EndpointConfig<T, R>} config - Configuration for the endpoint
 * @param {EndpointDependencies} [dependencies] - Optional dependencies for testing
 * @returns {Function} A standardized endpoint function
 */
function createEndpoint<
  T extends {
    id?: string | number;
    appId?: string;
    country?: string;
    lang?: string;
    requestOptions?: RequestOptions;
    throttle?: number;
  },
  R
>(config: EndpointConfig<T, R>, dependencies: EndpointDependencies = {}): (opts?: T) => Promise<R> {
  const { fetch, validate, transform, resolveId } = config;

  // Use provided dependencies or fall back to imports
  const requestFn = dependencies.requestFunction || request;

  return function endpoint(opts: T = {} as T): Promise<R> {
    return new Promise((resolve, reject) => {
      try {
        // Run validation if provided
        if (validate) {
          validate(opts);
        }

        // If we need to resolve an app ID
        if (resolveId && opts.appId && !opts.id) {
          // Get the app function when needed
          const getAppFn = async () => {
            if (dependencies.appFunction) {
              return dependencies.appFunction;
            }

            // Import the app module if not already imported
            if (!appModule) {
              appModule = await import('./app.js');
            }
            return appModule.default;
          };

          // Perform the app ID resolution
          getAppFn()
            .then(appFn =>
              appFn({
                appId: opts.appId,
                country: opts.country,
                lang: opts.lang,
                requestOptions: opts.requestOptions,
                throttle: opts.throttle
              })
            )
            .then(appData => {
              // Replace appId with resolved numeric id
              const newOpts = { ...opts, id: appData.id };
              // Continue with the fetch using the resolved ID
              return fetch(newOpts, { requestFn });
            })
            .then(data => (transform ? transform(data) : data))
            .then(resolve)
            .catch(reject);
        } else {
          // Standard fetch flow
          fetch(opts, { requestFn })
            .then(data => (transform ? transform(data) : data))
            .then(resolve)
            .catch(reject);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default createEndpoint;
