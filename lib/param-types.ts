/**
 * Standardized parameter types for all API endpoint methods
 */
import * as common from './common.js';

/**
 * Base request options interface for all API methods
 */
export interface BaseRequestOptions {
  /** The country code for the App Store (ISO 3166-1 alpha-2) */
  country?: string;
  /** The language code for localized data (e.g., 'en-us') */
  lang?: string;
  /** Maximum number of requests per second */
  throttle?: number;
  /** Additional options passed to the network request function */
  requestOptions?: common.RequestOptions;
}

/**
 * Options for methods that support pagination
 */
export interface PaginationOptions {
  /** Number of results to retrieve (per page) */
  num?: number;
  /** Page number to retrieve (starting from 1) */
  page?: number;
}

/**
 * Options for methods that require an app identifier
 */
export interface AppIdentifierOptions {
  /** The iTunes app ID (numeric) */
  id?: string | number;
  /** The app bundle ID (e.g., 'com.example.app') */
  appId?: string;
}

/**
 * Options for methods that support detailed results
 */
export interface DetailOptions {
  /** Whether to fetch full app details */
  fullDetail?: boolean;
}

/**
 * Normalized app identifier parameters for internal usage
 */
export interface NormalizedAppIdentifier {
  /** The field to use for lookup (id or bundleId) */
  idField: 'id' | 'bundleId';
  /** The value of the identifier */
  idValue: string | number;
}

/**
 * Normalizes app identifier options to a standard format
 * @param opts - Options containing either id or appId
 * @returns Normalized identifier object with idField and idValue
 * @throws Error if neither id nor appId is provided
 */
export function normalizeAppIdentifier(opts: AppIdentifierOptions): NormalizedAppIdentifier {
  const idField = opts.id !== undefined ? 'id' : 'bundleId';
  const idValue = opts.id !== undefined ? opts.id : opts.appId;

  if (idValue === undefined) {
    throw new Error('Either id or appId is required');
  }

  return { idField, idValue };
}
