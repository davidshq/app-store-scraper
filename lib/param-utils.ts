/**
 * Utility functions for handling and validating parameters
 */

import { validationError } from './error-utils.js';

/**
 * Ensures all required parameters are present
 *
 * @param opts - Options to validate
 * @param requiredParams - Array of required parameter names
 * @param defaultValues - Optional default values to apply if parameter missing
 * @returns Validated options with defaults applied
 */
export function assertRequired<T extends Record<string, any>>(
  opts: T,
  requiredParams: string[],
  defaultValues?: Partial<Record<string, any>>
): T {
  // Apply default values if provided
  if (defaultValues) {
    for (const [key, value] of Object.entries(defaultValues)) {
      if (opts[key as keyof T] === undefined) {
        (opts as Record<string, any>)[key] = value;
      }
    }
  }

  // Check for required parameters
  const missingParams = requiredParams.filter(param => opts[param as keyof T] === undefined);

  if (missingParams.length > 0) {
    throw validationError(`Missing required parameters: ${missingParams.join(', ')}`);
  }

  return opts;
}

/**
 * Ensures that either of two parameters is present
 *
 * @param opts - Options to validate
 * @param param1 - First parameter name
 * @param param2 - Second parameter name
 * @returns Input options if valid
 */
export function assertEither<T extends Record<string, any>>(
  opts: T,
  param1: string,
  param2: string
): T {
  if (opts[param1 as keyof T] === undefined && opts[param2 as keyof T] === undefined) {
    throw validationError(`Either ${param1} or ${param2} is required`);
  }

  return opts;
}

/**
 * Validates that a numeric value is within a range
 *
 * @param value - Value to check
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param defaultValue - Default to use if value is undefined
 * @returns Validated value
 */
export function validateInRange(
  value: number | undefined,
  min: number,
  max: number,
  defaultValue?: number
): number {
  // If value is undefined and default is provided, use default
  if (value === undefined && defaultValue !== undefined) {
    return defaultValue;
  }

  // If value is still undefined after checking for default, throw error
  if (value === undefined) {
    throw validationError(`Value is required but was undefined`);
  }

  // Check range constraints
  if (value < min) {
    throw validationError(`Value ${value} is less than minimum ${min}`);
  }

  if (value > max) {
    throw validationError(`Value ${value} is greater than maximum ${max}`);
  }

  return value;
}

/**
 * Validates that a value is within an enum of valid values
 *
 * @param value - Value to check
 * @param validValues - Array of valid options
 * @param defaultValue - Default to use if value is undefined
 * @returns Validated value
 */
export function validateEnum<T>(value: T | undefined, validValues: T[], defaultValue?: T): T {
  // If value is undefined and default is provided, use default
  if (value === undefined && defaultValue !== undefined) {
    return defaultValue;
  }

  // If value is still undefined after checking for default, throw error
  if (value === undefined) {
    throw validationError(`Value is required but was undefined`);
  }

  // Check if value is in valid values
  if (!validValues.includes(value)) {
    throw validationError(
      `Value ${String(value)} is not in valid values: ${validValues.map(v => String(v)).join(', ')}`
    );
  }

  return value;
}

/**
 * Exported interface for parameter utility functions
 */
export default {
  assertRequired,
  assertEither,
  validateInRange,
  validateEnum
};
