/**
 * TypeScript definitions for error handling
 */

/**
 * Standard error codes for common API errors
 */
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  NETWORK_ERROR = 'NETWORK_ERROR',
  PARSING_ERROR = 'PARSING_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * Custom error class for app-store-scraper errors
 */
export class AppStoreScraperError extends Error {
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
   * Creates a new AppStoreScraperError
   *
   * @param message - Error message
   * @param code - Error code from ErrorCode enum
   * @param originalError - The original error object (optional)
   */
  constructor(message: string, code: ErrorCode, originalError?: Error) {
    super(message);
    this.name = 'AppStoreScraperError';
    this.code = code;

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
}

/**
 * Error helper functions for creating specific error types
 */
export const errors = {
  /**
   * Creates a validation error
   *
   * @param message - Error message
   * @returns A validation error
   */
  validation: (message = 'Invalid parameter provided'): AppStoreScraperError => {
    return new AppStoreScraperError(message, ErrorCode.VALIDATION_ERROR);
  },

  /**
   * Creates a not found error
   *
   * @param message - Error message
   * @returns A not found error
   */
  notFound: (message = 'Resource not found'): AppStoreScraperError => {
    return new AppStoreScraperError(message, ErrorCode.NOT_FOUND);
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
   * Maps an HTTP error to a standardized error
   *
   * @param error - Original HTTP error
   * @returns A standardized error
   */
  fromHttpError: (error: Error): AppStoreScraperError => {
    if (!error || !(error as any).response) {
      return errors.network('Network error occurred', error);
    }

    const statusCode = (error as any).response.statusCode;

    if (statusCode === 404) {
      return errors.notFound('Resource not found (404)');
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
      error
    );
  }
};
