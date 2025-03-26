/**
 * Common utilities for app-store-scraper
 *
 * This file serves as a facade providing backward compatibility
 * by re-exporting functionality from more focused utility modules.
 */

// Re-export app types
import { App, RawAppData, ITunesApiResponse } from './types/app-types.js';
export type { App, RawAppData, ITunesApiResponse };

// Re-export HTTP utilities
import {
  request,
  makeRequest,
  createRequestOptions,
  createRequester
} from './utils/http-client.js';
import type { RequestOptions, RequestConfig } from './utils/http-client.js';
export { request, makeRequest, createRequestOptions, createRequester };
export type { RequestOptions, RequestConfig };

// Re-export rate limiter
import { getLimiter, scheduleWithRateLimit } from './utils/rate-limiter.js';
export { getLimiter, scheduleWithRateLimit };

// Re-export app transformation utilities
import { cleanApp } from './utils/app-transform.js';
export { cleanApp };

// Re-export store utilities
import { storeId } from './utils/store-utils.js';
export { storeId };

// Re-export iTunes API utilities
import { lookup } from './api/itunes-api.js';
export { lookup };
