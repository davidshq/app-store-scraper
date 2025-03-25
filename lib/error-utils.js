/**
 * Utilities for error handling in API functions
 */

/**
 * Standard error codes for common API errors
 * @type {Object}
 */
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  NETWORK_ERROR: 'NETWORK_ERROR',
  PARSING_ERROR: 'PARSING_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

/**
 * Creates a standardized error object
 *
 * @param {string} message - Error message
 * @param {string} code - Error code from ERROR_CODES
 * @param {any} [originalError] - The original error object
 * @returns {Error} A standardized error object
 */
function createError(message, code, originalError) {
  const error = new Error(message);
  error.code = code;

  if (originalError) {
    error.originalError = originalError;

    // Preserve stack trace from original error if possible
    if (originalError.stack) {
      error.stack = originalError.stack;
    }

    // Preserve status code if from HTTP error
    if (originalError.response && originalError.response.statusCode) {
      error.statusCode = originalError.response.statusCode;
    }
  }

  return error;
}

/**
 * Creates a validation error
 *
 * @param {string} message - Error message
 * @returns {Error} A validation error
 */
function validationError(message) {
  return createError(message || 'Invalid parameter provided', ERROR_CODES.VALIDATION_ERROR);
}

/**
 * Creates a not found error
 *
 * @param {string} [message] - Error message
 * @returns {Error} A not found error
 */
function notFoundError(message) {
  return createError(message || 'Resource not found', ERROR_CODES.NOT_FOUND);
}

/**
 * Maps an HTTP error to a standardized error
 *
 * @param {Error} error - Original HTTP error
 * @returns {Error} A standardized error
 */
function handleHttpError(error) {
  if (!error || !error.response) {
    return createError('Network error occurred', ERROR_CODES.NETWORK_ERROR, error);
  }

  const statusCode = error.response.statusCode;

  if (statusCode === 404) {
    return notFoundError('Resource not found (404)', error);
  }

  if (statusCode === 429) {
    return createError('Rate limit exceeded', ERROR_CODES.RATE_LIMIT, error);
  }

  if (statusCode >= 500) {
    return createError(`Server error (${statusCode})`, ERROR_CODES.SERVER_ERROR, error);
  }

  return createError(
    `HTTP request failed with status ${statusCode}`,
    ERROR_CODES.UNKNOWN_ERROR,
    error
  );
}

export { ERROR_CODES, createError, validationError, notFoundError, handleHttpError };
