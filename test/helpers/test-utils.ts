/**
 * Test utilities for supporting dependency injection in tests
 */

/**
 * Interface for mock app function options
 */
interface MockAppFunctionOptions {
  shouldFail?: boolean;
  customResponse?: MockApp;
}

/**
 * Interface for mock app response
 */
interface MockApp {
  id: number;
  appId: string;
  title: string;
  description: string;
  url: string;
  developer: string;
  developerId: number;
  [key: string]: any;
}

/**
 * Interface for app function options
 */
interface AppFunctionOptions {
  id?: string | number;
  appId?: string;
  country?: string;
  [key: string]: any;
}

/**
 * Interface for mock store ID function options
 */
interface MockStoreIdFunctionOptions {
  storeIdMap?: Record<string, string>;
}

/**
 * Interface for mock request function options
 */
interface MockRequestFunctionOptions {
  shouldFail?: boolean;
  statusCode?: number;
  response?: any;
}

/**
 * Creates a mock app function that resolves to a test app
 *
 * @param options - Options for controlling the mock behavior
 * @returns A mock app function
 */
export function createMockAppFunction(
  options: MockAppFunctionOptions = {}
): (opts: AppFunctionOptions) => Promise<MockApp> {
  const { shouldFail = false, customResponse } = options;

  return async function mockApp(opts: AppFunctionOptions): Promise<MockApp> {
    if (shouldFail) {
      throw new Error('App lookup failed');
    }

    return (
      customResponse || {
        id: 123456,
        appId: opts.appId || 'com.test.app',
        title: 'Test App',
        description: 'A test app',
        url: `https://apps.apple.com/app/id${123456}`,
        developer: 'Test Developer',
        developerId: 987654
      }
    );
  };
}

/**
 * Interface for store ID function options
 */
interface StoreIdFunctionOptions {
  countryCode?: string;
}

/**
 * Creates mock storeId function
 *
 * @param options - Options for controlling the mock behavior
 * @returns A mock storeId function
 */
export function createMockStoreIdFunction(
  options: MockStoreIdFunctionOptions = {}
): (countryCode?: string) => string {
  const { storeIdMap = {} } = options;

  const defaultMap: Record<string, string> = {
    us: '143441',
    gb: '143444',
    de: '143443',
    fr: '143442'
  };

  const finalMap = { ...defaultMap, ...storeIdMap };

  return function mockStoreId(countryCode?: string): string {
    if (!countryCode) return finalMap.us;
    const code = countryCode.toLowerCase();
    return finalMap[code] || finalMap.us;
  };
}

/**
 * Interface for parameter utilities
 */
interface ParamUtils {
  getStoreHeader: (opts: Record<string, any>, storeType?: number) => Record<string, string>;
  addLanguageHeader: (
    headers: Record<string, string>,
    opts: Record<string, any>
  ) => Record<string, string>;
  getHeaders: (opts: Record<string, any>, storeType?: number) => Record<string, string>;
}

/**
 * Creates a set of mock parameter utility functions
 *
 * @returns The parameter utility functions
 */
export function createMockParamUtils(): ParamUtils {
  return {
    getStoreHeader: (opts: Record<string, any>, storeType = 32) => {
      const country = opts.country || 'us';
      return {
        'X-Apple-Store-Front': `test-store-${country},${storeType}`
      };
    },

    addLanguageHeader: (headers: Record<string, string>, opts: Record<string, any>) => {
      if (opts.lang) {
        return {
          ...headers,
          'Accept-Language': opts.lang
        };
      }
      return headers;
    },

    getHeaders: function (opts: Record<string, any>, storeType?: number) {
      const baseHeaders = this.getStoreHeader(opts, storeType);
      return this.addLanguageHeader(baseHeaders, opts);
    }
  };
}

/**
 * Creates a mock request function
 *
 * @param options - Options for controlling the mock behavior
 * @returns A mock request function
 */
export function createMockRequestFunction(
  options: MockRequestFunctionOptions = {}
): (url: string, opts?: Record<string, any>) => Promise<any> {
  const { shouldFail = false, statusCode = 404, response } = options;

  return async function mockRequest(url: string, opts?: Record<string, any>): Promise<any> {
    if (shouldFail) {
      const error: Error & { response?: { statusCode: number } } = new Error('Request failed');
      error.response = { statusCode };
      throw error;
    }

    // Return custom response or a string based on the URL
    return response || `Mock response for ${url}`;
  };
}

/**
 * Creates a test function with mock dependencies injected
 *
 * @param originalFn - The original function to mock
 * @param mocks - Object containing mock dependencies
 * @returns The function with mocked dependencies
 */
export function createTestFn<T extends (...args: any[]) => any>(
  originalFn: T,
  mocks: Record<string, any> = {}
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    return originalFn(...args, { dependencies: mocks }) as ReturnType<T>;
  };
}
