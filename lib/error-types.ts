/**
 * TypeScript definitions for error handling
 */

/**
 * Standard error codes for common API errors
 */
export enum ErrorCode {
  // Base error types
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  NETWORK_ERROR = 'NETWORK_ERROR',
  PARSING_ERROR = 'PARSING_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',

  // More specific error codes for different endpoints
  APP_NOT_FOUND = 'APP_NOT_FOUND',
  DEVELOPER_NOT_FOUND = 'DEVELOPER_NOT_FOUND',
  REVIEW_NOT_FOUND = 'REVIEW_NOT_FOUND',
  RATINGS_UNAVAILABLE = 'RATINGS_UNAVAILABLE',
  SEARCH_FAILED = 'SEARCH_FAILED',
  LIST_FAILED = 'LIST_FAILED',
  SIMILAR_NOT_AVAILABLE = 'SIMILAR_NOT_AVAILABLE',
  VERSION_HISTORY_UNAVAILABLE = 'VERSION_HISTORY_UNAVAILABLE',
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  MALFORMED_RESPONSE = 'MALFORMED_RESPONSE',
  THROTTLING_ERROR = 'THROTTLING_ERROR',
  API_VERSION_ERROR = 'API_VERSION_ERROR',
  REGION_RESTRICTION = 'REGION_RESTRICTION'
}

/**
 * Maps specific error codes to their parent categories
 */
export const errorCategories: Record<ErrorCode, ErrorCode> = {
  // Base errors map to themselves
  [ErrorCode.VALIDATION_ERROR]: ErrorCode.VALIDATION_ERROR,
  [ErrorCode.NOT_FOUND]: ErrorCode.NOT_FOUND,
  [ErrorCode.NETWORK_ERROR]: ErrorCode.NETWORK_ERROR,
  [ErrorCode.PARSING_ERROR]: ErrorCode.PARSING_ERROR,
  [ErrorCode.SERVER_ERROR]: ErrorCode.SERVER_ERROR,
  [ErrorCode.RATE_LIMIT]: ErrorCode.RATE_LIMIT,
  [ErrorCode.UNKNOWN_ERROR]: ErrorCode.UNKNOWN_ERROR,

  // Specific errors map to their parent category
  [ErrorCode.APP_NOT_FOUND]: ErrorCode.NOT_FOUND,
  [ErrorCode.DEVELOPER_NOT_FOUND]: ErrorCode.NOT_FOUND,
  [ErrorCode.REVIEW_NOT_FOUND]: ErrorCode.NOT_FOUND,
  [ErrorCode.RATINGS_UNAVAILABLE]: ErrorCode.NOT_FOUND,
  [ErrorCode.SEARCH_FAILED]: ErrorCode.UNKNOWN_ERROR,
  [ErrorCode.LIST_FAILED]: ErrorCode.UNKNOWN_ERROR,
  [ErrorCode.SIMILAR_NOT_AVAILABLE]: ErrorCode.NOT_FOUND,
  [ErrorCode.VERSION_HISTORY_UNAVAILABLE]: ErrorCode.NOT_FOUND,
  [ErrorCode.INVALID_PARAMETER]: ErrorCode.VALIDATION_ERROR,
  [ErrorCode.MALFORMED_RESPONSE]: ErrorCode.PARSING_ERROR,
  [ErrorCode.THROTTLING_ERROR]: ErrorCode.RATE_LIMIT,
  [ErrorCode.API_VERSION_ERROR]: ErrorCode.SERVER_ERROR,
  [ErrorCode.REGION_RESTRICTION]: ErrorCode.NOT_FOUND
};

/**
 * Base error interface for all app-store-scraper errors
 */
export interface IAppStoreScraperError {
  code: ErrorCode;
  originalError?: Error;
  statusCode?: number;
  endpoint?: string;
  params?: Record<string, any>;
}

/**
 * Custom error class for app-store-scraper errors
 */
export class AppStoreScraperError extends Error implements IAppStoreScraperError {
  /**
   * Error code from ErrorCode enum
   */
  code: ErrorCode;

  /**
   * Original error that caused this error (if any)
   */
  originalError?: Error;

  /**
   * HTTP status code (if applicable)
   */
  statusCode?: number;

  /**
   * API endpoint that caused the error (if applicable)
   */
  endpoint?: string;

  /**
   * Parameters used in the API call (if applicable)
   */
  params?: Record<string, any>;

  /**
   * Creates a new AppStoreScraperError
   *
   * @param message - Error message
   * @param code - Error code from ErrorCode enum
   * @param originalError - The original error object (optional)
   * @param endpoint - The API endpoint involved (optional)
   * @param params - Parameters used in the API call (optional)
   */
  constructor(
    message: string,
    code: ErrorCode,
    originalError?: Error,
    endpoint?: string,
    params?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppStoreScraperError';
    this.code = code;

    if (endpoint) {
      this.endpoint = endpoint;
    }

    if (params) {
      this.params = params;
    }

    if (originalError) {
      this.originalError = originalError;

      // Preserve stack trace from original error if possible
      if (originalError.stack) {
        this.stack = originalError.stack;
      }

      // Preserve status code if from HTTP error
      const anyError = originalError as any;
      if (anyError.response && anyError.response.statusCode) {
        this.statusCode = anyError.response.statusCode;
      }
    }

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppStoreScraperError.prototype);
  }

  /**
   * Gets whether this error belongs to a specific category
   * @param category - The category to check against
   * @returns True if the error is in the specified category
   */
  isCategory(category: ErrorCode): boolean {
    return errorCategories[this.code] === category;
  }

  /**
   * Indicates if this error is recoverable
   * @returns True if the error might be recoverable (e.g., retrying)
   */
  isRecoverable(): boolean {
    return [
      ErrorCode.NETWORK_ERROR,
      ErrorCode.RATE_LIMIT,
      ErrorCode.THROTTLING_ERROR,
      ErrorCode.SERVER_ERROR
    ].includes(this.code);
  }

  /**
   * Returns a plain object representation of the error
   * @returns Plain object with error details
   */
  toJSON(): Record<string, any> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      endpoint: this.endpoint,
      params: this.params,
      stack: this.stack
    };
  }
}

/**
 * Specialized error classes for different API endpoints
 */

/**
 * Error for app lookup endpoint
 */
export class AppLookupError extends AppStoreScraperError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.APP_NOT_FOUND,
    originalError?: Error,
    params?: Record<string, any>
  ) {
    super(message, code, originalError, 'app', params);
    this.name = 'AppLookupError';
    Object.setPrototypeOf(this, AppLookupError.prototype);
  }
}

/**
 * Error for developer lookup endpoint
 */
export class DeveloperError extends AppStoreScraperError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.DEVELOPER_NOT_FOUND,
    originalError?: Error,
    params?: Record<string, any>
  ) {
    super(message, code, originalError, 'developer', params);
    this.name = 'DeveloperError';
    Object.setPrototypeOf(this, DeveloperError.prototype);
  }
}

/**
 * Error for ratings endpoint
 */
export class RatingsError extends AppStoreScraperError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.RATINGS_UNAVAILABLE,
    originalError?: Error,
    params?: Record<string, any>
  ) {
    super(message, code, originalError, 'ratings', params);
    this.name = 'RatingsError';
    Object.setPrototypeOf(this, RatingsError.prototype);
  }
}

/**
 * Error for reviews endpoint
 */
export class ReviewsError extends AppStoreScraperError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.REVIEW_NOT_FOUND,
    originalError?: Error,
    params?: Record<string, any>
  ) {
    super(message, code, originalError, 'reviews', params);
    this.name = 'ReviewsError';
    Object.setPrototypeOf(this, ReviewsError.prototype);
  }
}

/**
 * Error for search endpoint
 */
export class SearchError extends AppStoreScraperError {
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.SEARCH_FAILED,
    originalError?: Error,
    params?: Record<string, any>
  ) {
    super(message, code, originalError, 'search', params);
    this.name = 'SearchError';
    Object.setPrototypeOf(this, SearchError.prototype);
  }
}

/**
 * Error helper functions for creating specific error types
 */
export const errors = {
  /**
   * Creates a validation error
   *
   * @param message - Error message
   * @param params - Parameters that caused the validation error
   * @returns A validation error
   */
  validation: (
    message = 'Invalid parameter provided',
    params?: Record<string, any>
  ): AppStoreScraperError => {
    return new AppStoreScraperError(
      message,
      ErrorCode.VALIDATION_ERROR,
      undefined,
      undefined,
      params
    );
  },

  /**
   * Creates a not found error
   *
   * @param message - Error message
   * @param endpoint - The endpoint where the resource was not found
   * @returns A not found error
   */
  notFound: (message = 'Resource not found', endpoint?: string): AppStoreScraperError => {
    return new AppStoreScraperError(message, ErrorCode.NOT_FOUND, undefined, endpoint);
  },

  /**
   * Creates a network error
   *
   * @param message - Error message
   * @param originalError - The original error
   * @returns A network error
   */
  network: (message = 'Network error occurred', originalError?: Error): AppStoreScraperError => {
    return new AppStoreScraperError(message, ErrorCode.NETWORK_ERROR, originalError);
  },

  /**
   * Creates a parsing error
   *
   * @param message - Error message
   * @param originalError - The original error
   * @returns A parsing error
   */
  parsing: (message = 'Error parsing response', originalError?: Error): AppStoreScraperError => {
    return new AppStoreScraperError(message, ErrorCode.PARSING_ERROR, originalError);
  },

  /**
   * Creates a server error
   *
   * @param message - Error message
   * @param originalError - The original error
   * @returns A server error
   */
  server: (message = 'Server error', originalError?: Error): AppStoreScraperError => {
    return new AppStoreScraperError(message, ErrorCode.SERVER_ERROR, originalError);
  },

  /**
   * Creates a rate limit error
   *
   * @param message - Error message
   * @param originalError - The original error
   * @returns A rate limit error
   */
  rateLimit: (message = 'Rate limit exceeded', originalError?: Error): AppStoreScraperError => {
    return new AppStoreScraperError(message, ErrorCode.RATE_LIMIT, originalError);
  },

  /**
   * Creates an app lookup error
   *
   * @param message - Error message
   * @param code - Specific error code
   * @param originalError - The original error
   * @param params - Parameters used in the API call
   * @returns An app lookup error
   */
  app: (
    message = 'App lookup failed',
    code = ErrorCode.APP_NOT_FOUND,
    originalError?: Error,
    params?: Record<string, any>
  ): AppLookupError => {
    return new AppLookupError(message, code, originalError, params);
  },

  /**
   * Creates a developer lookup error
   *
   * @param message - Error message
   * @param code - Specific error code
   * @param originalError - The original error
   * @param params - Parameters used in the API call
   * @returns A developer lookup error
   */
  developer: (
    message = 'Developer lookup failed',
    code = ErrorCode.DEVELOPER_NOT_FOUND,
    originalError?: Error,
    params?: Record<string, any>
  ): DeveloperError => {
    return new DeveloperError(message, code, originalError, params);
  },

  /**
   * Creates a ratings error
   *
   * @param message - Error message
   * @param code - Specific error code
   * @param originalError - The original error
   * @param params - Parameters used in the API call
   * @returns A ratings error
   */
  ratings: (
    message = 'Ratings lookup failed',
    code = ErrorCode.RATINGS_UNAVAILABLE,
    originalError?: Error,
    params?: Record<string, any>
  ): RatingsError => {
    return new RatingsError(message, code, originalError, params);
  },

  /**
   * Creates a reviews error
   *
   * @param message - Error message
   * @param code - Specific error code
   * @param originalError - The original error
   * @param params - Parameters used in the API call
   * @returns A reviews error
   */
  reviews: (
    message = 'Reviews lookup failed',
    code = ErrorCode.REVIEW_NOT_FOUND,
    originalError?: Error,
    params?: Record<string, any>
  ): ReviewsError => {
    return new ReviewsError(message, code, originalError, params);
  },

  /**
   * Creates a search error
   *
   * @param message - Error message
   * @param code - Specific error code
   * @param originalError - The original error
   * @param params - Parameters used in the API call
   * @returns A search error
   */
  search: (
    message = 'Search failed',
    code = ErrorCode.SEARCH_FAILED,
    originalError?: Error,
    params?: Record<string, any>
  ): SearchError => {
    return new SearchError(message, code, originalError, params);
  },

  /**
   * Maps an HTTP error to a standardized error
   *
   * @param error - Original HTTP error
   * @param endpoint - The endpoint where the error occurred
   * @returns A standardized error
   */
  fromHttpError: (error: Error, endpoint?: string): AppStoreScraperError => {
    if (!error || !(error as any).response) {
      return errors.network('Network error occurred', error);
    }

    const statusCode = (error as any).response.statusCode;

    if (statusCode === 404) {
      return errors.notFound('Resource not found (404)', endpoint);
    }

    if (statusCode === 429) {
      return errors.rateLimit('Rate limit exceeded', error);
    }

    if (statusCode >= 500) {
      return errors.server(`Server error (${statusCode})`, error);
    }

    return new AppStoreScraperError(
      `HTTP request failed with status ${statusCode}`,
      ErrorCode.UNKNOWN_ERROR,
      error,
      endpoint
    );
  }
};
