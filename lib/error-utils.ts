/**
 * Utilities for error handling in API functions
 */

import { AppStoreScraperError, ErrorCode, errors } from './error-types.js';

/**
 * Creates a validation error
 *
 * @param message - Error message
 * @returns A validation error
 */
function validationError(message?: string): AppStoreScraperError {
  return errors.validation(message);
}

/**
 * Creates a not found error
 *
 * @param message - Error message
 * @returns A not found error
 */
function notFoundError(message?: string): AppStoreScraperError {
  return errors.notFound(message);
}

/**
 * Maps an HTTP error to a standardized error
 *
 * @param error - Original HTTP error
 * @returns A standardized error
 */
function handleHttpError(error: Error): AppStoreScraperError {
  return errors.fromHttpError(error);
}

/**
 * Safely parses JSON and handles parsing errors
 *
 * @param text - JSON text to parse
 * @returns Parsed JSON data
 * @throws AppStoreScraperError if parsing fails
 */
function safeJsonParse<T>(text: string): T {
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    throw errors.parsing(
      'Failed to parse JSON response',
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

/**
 * Handles errors from HTTP requests
 *
 * @param error - The error that occurred
 * @param context - Additional context about where the error occurred
 * @returns Never returns, always throws an AppStoreScraperError
 * @throws AppStoreScraperError with appropriate details
 */
function handleRequestError(error: Error, context?: string): never {
  const errorWithContext = new Error(`${context ? `${context}: ` : ''}${error.message}`);
  errorWithContext.stack = error.stack;

  throw errors.fromHttpError(errorWithContext);
}

export {
  ErrorCode,
  AppStoreScraperError,
  validationError,
  notFoundError,
  handleHttpError,
  safeJsonParse,
  handleRequestError
};
