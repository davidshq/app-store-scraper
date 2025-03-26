/**
 * Common type definitions for test files
 */

import type { App } from '../lib/types/app-types.js';

/**
 * Interface for options used with various mock functions
 */
export interface MockOptions {
  shouldFail?: boolean;
  statusCode?: number;
  customResponse?: any;
  response?: any;
  storeIdMap?: Record<string, string>;
  [key: string]: any;
}

/**
 * Interface for a search result item
 */
export interface SearchResult {
  id: string | number;
  appId: string;
  title: string;
  url: string;
  description?: string;
  developer?: string;
  developerUrl?: string;
  icon?: string;
  genres?: string[];
  genreIds?: string[];
  [key: string]: any;
}

/**
 * Interface for a simple reviews result
 */
export interface ReviewsResult {
  id: string;
  userName: string;
  userUrl: string;
  version: string;
  score: number;
  title: string;
  text: string;
  url: string;
  [key: string]: any;
}

/**
 * Interface for a list result
 */
export interface ListResult {
  id: string | number;
  appId: string;
  title: string;
  icon: string;
  url?: string;
  developer?: string;
  developerId?: string | number;
  genres?: string[];
  [key: string]: any;
}

/**
 * Interface for a developer result
 */
export interface DeveloperResult {
  id: string | number;
  appId: string;
  title: string;
  url: string;
  developer: string;
  developerId: string | number;
  [key: string]: any;
}

/**
 * Interface for a suggestions result
 */
export interface SuggestionsResult {
  term: string;
  priority: number;
  [key: string]: any;
}

export type { App };
