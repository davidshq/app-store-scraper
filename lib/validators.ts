import * as R from 'ramda';
import c from './constants.js';

/**
 * Generic options interface with string-indexed keys
 */
export interface GenericOptions {
  [key: string]: any;
}

/**
 * Validates that required fields are present in options
 * @param {Object} opts - Options to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @param {string} message - Error message if requirements not met
 * @throws {Error} If any required field is missing
 */
function validateRequired(opts: GenericOptions, requiredFields: string[], message?: string): void {
  const hasAllFields = requiredFields.every(field => opts[field]);
  if (!hasAllFields) {
    throw Error(message || `Missing required fields: ${requiredFields.join(', ')}`);
  }
}

/**
 * Validates that either of two fields is present in options
 * @param {Object} opts - Options to validate
 * @param {string} field1 - First field name
 * @param {string} field2 - Second field name
 * @param {string} message - Error message if requirements not met
 * @throws {Error} If both fields are missing
 */
function validateEither(
  opts: GenericOptions,
  field1: string,
  field2: string,
  message?: string
): void {
  if (!opts[field1] && !opts[field2]) {
    throw Error(message || `Either ${field1} or ${field2} is required`);
  }
}

/**
 * Validates a field against an array of valid values
 * @param {Object} opts - Options to validate
 * @param {string} field - Field name to validate
 * @param {Array} validValues - Array of valid values
 * @param {string} message - Error message if value is invalid
 * @throws {Error} If the field value is not valid
 */
function validateEnum<T>(
  opts: GenericOptions,
  field: string,
  validValues: T[],
  message?: string
): void {
  if (opts[field] && !R.includes(opts[field], validValues)) {
    throw Error(message || `Invalid ${field} ${opts[field]}`);
  }
}

/**
 * Validates a field is within a numeric range
 * @param {Object} opts - Options to validate
 * @param {string} field - Field name to validate
 * @param {number} min - Minimum valid value (inclusive)
 * @param {number} max - Maximum valid value (inclusive)
 * @param {string} message - Error message if value is out of range
 * @throws {Error} If the field value is outside the range
 */
function validateRange(
  opts: GenericOptions,
  field: string,
  min: number,
  max: number,
  message?: string
): void {
  if (opts[field]) {
    if (opts[field] < min) {
      throw Error(message || `${field} cannot be lower than ${min}`);
    }
    if (opts[field] > max) {
      throw Error(message || `${field} cannot be greater than ${max}`);
    }
  }
}

/**
 * App options interface
 */
export interface AppValidationOptions extends GenericOptions {
  id?: string | number;
  appId?: string;
}

/**
 * Validates options for app requests
 * @param {Object} opts - Options to validate
 * @throws {Error} If id/appId is missing
 */
function validateApp(opts: AppValidationOptions): void {
  validateEither(opts, 'id', 'appId', 'Either id or appId is required');
}

/**
 * List options interface
 */
export interface ListValidationOptions extends GenericOptions {
  category?: number;
  collection?: string;
  num?: number;
  country?: string;
}

/**
 * Validates options for list requests
 * @param {Object} opts - Options to validate
 * @throws {Error} If category, collection, or num options are invalid
 */
function validateList(opts: ListValidationOptions): void {
  if (opts.category) {
    validateEnum(opts, 'category', R.values(c.category), `Invalid category ${opts.category}`);
  }

  opts.collection = opts.collection || c.collection.TOP_FREE_IOS;
  validateEnum(opts, 'collection', R.values(c.collection), `Invalid collection ${opts.collection}`);

  opts.num = opts.num || 50;
  validateRange(opts, 'num', 1, 200, 'Cannot retrieve more than 200 apps');

  opts.country = opts.country || 'us';
}

/**
 * Reviews options interface
 */
export interface ReviewsValidationOptions extends GenericOptions {
  id?: string | number;
  appId?: string;
  sort?: string;
  page?: number;
}

/**
 * Validates options for reviews requests
 * @param {Object} opts - Options to validate
 * @throws {Error} If id/appId is missing or other options are invalid
 */
function validateReviews(opts: ReviewsValidationOptions): void {
  validateEither(opts, 'id', 'appId', 'Either id or appId is required');

  if (opts.sort) {
    validateEnum(opts, 'sort', R.values(c.sort), `Invalid sort ${opts.sort}`);
  }

  validateRange(opts, 'page', 1, 10, 'Page cannot be greater than 10');
}

export {
  validateRequired,
  validateEither,
  validateEnum,
  validateRange,
  validateApp,
  validateList,
  validateReviews
};
