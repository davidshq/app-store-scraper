import * as R from 'ramda';
import c from './constants.js';
import { AppIdentifierOptions, BaseRequestOptions, PaginationOptions } from './param-types.js';
import { errors } from './error-types.js';

/**
 * Generic options interface with string-indexed keys
 */
export interface GenericOptions {
  [key: string]: any;
}

/**
 * Interface for field descriptions to provide more context in error messages
 */
interface FieldDescriptions {
  [key: string]: string;
}

/**
 * Common field descriptions for better error messages
 */
const fieldDescriptions: FieldDescriptions = {
  id: 'numeric App Store ID',
  appId: 'app bundle identifier (e.g., "com.example.app")',
  country: 'two-letter country code (e.g., "us", "gb")',
  lang: 'language code (e.g., "en-us")',
  category: 'numeric App Store category ID',
  collection: 'App Store collection identifier',
  term: 'search term or phrase',
  num: 'number of results to retrieve',
  page: 'page number (starting from 1)',
  sort: 'sort order for results',
  developerId: 'numeric developer ID',
  developerName: 'developer name',
  rating: 'app store rating (0-5)',
  date: 'date string in YYYY-MM-DD format',
  limit: 'maximum number of results to return'
};

/**
 * Gets a field description or returns the field name if no description exists
 * @param {string} field - The field name
 * @returns {string} - The field description or field name
 */
function getFieldDescription(field: string): string {
  return fieldDescriptions[field] || field;
}

/**
 * Validates that required fields are present in options
 * @param {Object} opts - Options to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @param {string} message - Optional custom error message
 * @throws {AppStoreScraperError} If any required field is missing
 */
function validateRequired(opts: GenericOptions, requiredFields: string[], message?: string): void {
  const missingFields = requiredFields.filter(field => !opts[field]);

  if (missingFields.length > 0) {
    const missingDescriptions = missingFields.map(field => {
      const description = getFieldDescription(field);
      return `"${field}" (${description})`;
    });

    const errorMessage =
      message ||
      `Missing required parameter${missingFields.length > 1 ? 's' : ''}: ${missingDescriptions.join(', ')}`;

    throw errors.validation(errorMessage);
  }
}

/**
 * Validates that either of two fields is present in options
 * @param {Object} opts - Options to validate
 * @param {string} field1 - First field name
 * @param {string} field2 - Second field name
 * @param {string} message - Optional custom error message
 * @throws {AppStoreScraperError} If both fields are missing
 */
function validateEither(
  opts: GenericOptions,
  field1: string,
  field2: string,
  message?: string
): void {
  if (!opts[field1] && !opts[field2]) {
    const desc1 = getFieldDescription(field1);
    const desc2 = getFieldDescription(field2);

    const errorMessage =
      message || `Either "${field1}" (${desc1}) or "${field2}" (${desc2}) is required`;

    throw errors.validation(errorMessage);
  }
}

/**
 * Validates a field against an array of valid values
 * @param {Object} opts - Options to validate
 * @param {string} field - Field name to validate
 * @param {Array} validValues - Array of valid values
 * @param {string} message - Optional custom error message
 * @throws {AppStoreScraperError} If the field value is not valid
 */
function validateEnum<T>(
  opts: GenericOptions,
  field: string,
  validValues: T[],
  message?: string
): void {
  if (opts[field] && !R.includes(opts[field], validValues)) {
    const fieldDesc = getFieldDescription(field);

    // Format the valid values for display (limit to 5 with ellipsis if more)
    const displayValues = validValues
      .slice(0, 5)
      .map(v => `"${v}"`)
      .join(', ');
    const valuesText =
      validValues.length > 5
        ? `${displayValues}, ... (${validValues.length - 5} more)`
        : displayValues;

    const errorMessage =
      message ||
      `Invalid value "${opts[field]}" for "${field}" (${fieldDesc}). Valid values include: ${valuesText}`;

    throw errors.validation(errorMessage);
  }
}

/**
 * Validates a field is within a numeric range
 * @param {Object} opts - Options to validate
 * @param {string} field - Field name to validate
 * @param {number} min - Minimum valid value (inclusive)
 * @param {number} max - Maximum valid value (inclusive)
 * @param {string} message - Optional custom error message
 * @throws {AppStoreScraperError} If the field value is outside the range
 */
function validateRange(
  opts: GenericOptions,
  field: string,
  min: number,
  max: number,
  message?: string
): void {
  if (opts[field] !== undefined) {
    const value = Number(opts[field]);

    // Check if the value is not a number
    if (isNaN(value)) {
      const fieldDesc = getFieldDescription(field);
      throw errors.validation(
        `Invalid value "${opts[field]}" for "${field}" (${fieldDesc}). Expected a number.`
      );
    }

    // Check minimum
    if (value < min) {
      const fieldDesc = getFieldDescription(field);
      const errorMessage =
        message || `Value for "${field}" (${fieldDesc}) must be at least ${min}, got ${value}`;

      throw errors.validation(errorMessage);
    }

    // Check maximum
    if (value > max) {
      const fieldDesc = getFieldDescription(field);
      const errorMessage =
        message || `Value for "${field}" (${fieldDesc}) must be at most ${max}, got ${value}`;

      throw errors.validation(errorMessage);
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
 * @param {AppIdentifierOptions} opts - Options to validate
 * @throws {AppStoreScraperError} If id/appId is missing
 */
function validateApp(opts: AppIdentifierOptions): void {
  validateEither(opts, 'id', 'appId');
}

/**
 * List options interface
 */
export interface ListValidationOptions extends BaseRequestOptions {
  category?: number;
  collection?: string;
  num?: number;
}

/**
 * Validates options for list requests
 * @param {ListValidationOptions} opts - Options to validate
 * @throws {AppStoreScraperError} If category, collection, or num options are invalid
 */
function validateList(opts: ListValidationOptions): void {
  if (opts.category) {
    validateEnum(opts, 'category', R.values(c.category));
  }

  opts.collection = opts.collection || c.collection.TOP_FREE_IOS;
  validateEnum(opts, 'collection', R.values(c.collection));

  opts.num = opts.num || 50;
  validateRange(opts, 'num', 1, 200);

  opts.country = opts.country || 'us';
}

/**
 * Reviews options interface
 */
export interface ReviewsValidationOptions
  extends AppIdentifierOptions,
    BaseRequestOptions,
    Pick<PaginationOptions, 'page'> {
  sort?: string;
}

/**
 * Validates options for reviews requests
 * @param {ReviewsValidationOptions} opts - Options to validate
 * @throws {AppStoreScraperError} If id/appId is missing or other options are invalid
 */
function validateReviews(opts: ReviewsValidationOptions): void {
  validateEither(opts, 'id', 'appId');

  if (opts.sort) {
    validateEnum(opts, 'sort', R.values(c.sort));
  }

  validateRange(opts, 'page', 1, 10);
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
