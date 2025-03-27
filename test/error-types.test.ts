import { describe, it, expect } from 'vitest';
import {
  AppStoreScraperError,
  ErrorCode,
  errors,
  AppLookupError,
  DeveloperError,
  RatingsError,
  ReviewsError,
  SearchError,
  errorCategories
} from '../lib/error-types.js';

describe('Error Types', () => {
  describe('AppStoreScraperError', () => {
    it('should create an error with the correct name and code', () => {
      const error = new AppStoreScraperError('Test error message', ErrorCode.VALIDATION_ERROR);

      expect(error.name).toBe('AppStoreScraperError');
      expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(error.message).toBe('Test error message');
      expect(error instanceof Error).toBe(true);
      expect(error instanceof AppStoreScraperError).toBe(true);
    });

    it('should preserve original error stack when provided', () => {
      const originalError = new Error('Original error');
      const error = new AppStoreScraperError(
        'Wrapper error',
        ErrorCode.NETWORK_ERROR,
        originalError
      );

      expect(error.originalError).toBe(originalError);
      expect(error.stack).toBe(originalError.stack);
    });

    it('should preserve status code from HTTP error response', () => {
      const originalError = new Error('HTTP error') as any;
      originalError.response = { statusCode: 404 };

      const error = new AppStoreScraperError('Not found', ErrorCode.NOT_FOUND, originalError);

      expect(error.statusCode).toBe(404);
    });

    it('should store endpoint and params when provided', () => {
      const params = { id: '123', country: 'us' };
      const error = new AppStoreScraperError(
        'API error',
        ErrorCode.VALIDATION_ERROR,
        undefined,
        'app',
        params
      );

      expect(error.endpoint).toBe('app');
      expect(error.params).toEqual(params);
    });

    it('should check if error belongs to a category', () => {
      const error = new AppStoreScraperError('Not found', ErrorCode.APP_NOT_FOUND);

      expect(error.isCategory(ErrorCode.NOT_FOUND)).toBe(true);
      expect(error.isCategory(ErrorCode.VALIDATION_ERROR)).toBe(false);
    });

    it('should identify recoverable errors correctly', () => {
      const recoverableError = new AppStoreScraperError('Network issue', ErrorCode.NETWORK_ERROR);
      const nonRecoverableError = new AppStoreScraperError(
        'Invalid param',
        ErrorCode.VALIDATION_ERROR
      );

      expect(recoverableError.isRecoverable()).toBe(true);
      expect(nonRecoverableError.isRecoverable()).toBe(false);
    });

    it('should serialize to a JSON object', () => {
      const error = new AppStoreScraperError(
        'Error message',
        ErrorCode.SERVER_ERROR,
        undefined,
        'app',
        { id: '123' }
      );

      const jsonObj = error.toJSON();

      expect(jsonObj.name).toBe('AppStoreScraperError');
      expect(jsonObj.message).toBe('Error message');
      expect(jsonObj.code).toBe(ErrorCode.SERVER_ERROR);
      expect(jsonObj.endpoint).toBe('app');
      expect(jsonObj.params).toEqual({ id: '123' });
    });
  });

  describe('Specialized Error Classes', () => {
    it('should create AppLookupError correctly', () => {
      const error = new AppLookupError('App not found');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error instanceof AppLookupError).toBe(true);
      expect(error.name).toBe('AppLookupError');
      expect(error.code).toBe(ErrorCode.APP_NOT_FOUND);
      expect(error.endpoint).toBe('app');
    });

    it('should create DeveloperError correctly', () => {
      const error = new DeveloperError('Developer not found');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error instanceof DeveloperError).toBe(true);
      expect(error.name).toBe('DeveloperError');
      expect(error.code).toBe(ErrorCode.DEVELOPER_NOT_FOUND);
      expect(error.endpoint).toBe('developer');
    });

    it('should create RatingsError correctly', () => {
      const error = new RatingsError('Ratings unavailable');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error instanceof RatingsError).toBe(true);
      expect(error.name).toBe('RatingsError');
      expect(error.code).toBe(ErrorCode.RATINGS_UNAVAILABLE);
      expect(error.endpoint).toBe('ratings');
    });

    it('should create ReviewsError correctly', () => {
      const error = new ReviewsError('Reviews not found');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error instanceof ReviewsError).toBe(true);
      expect(error.name).toBe('ReviewsError');
      expect(error.code).toBe(ErrorCode.REVIEW_NOT_FOUND);
      expect(error.endpoint).toBe('reviews');
    });

    it('should create SearchError correctly', () => {
      const error = new SearchError('Search failed');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error instanceof SearchError).toBe(true);
      expect(error.name).toBe('SearchError');
      expect(error.code).toBe(ErrorCode.SEARCH_FAILED);
      expect(error.endpoint).toBe('search');
    });
  });

  describe('Error Factory Functions', () => {
    it('should create validation error', () => {
      const error = errors.validation('Invalid parameter');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
      expect(error.message).toBe('Invalid parameter');
    });

    it('should create validation error with default message and params', () => {
      const params = { id: null };
      const error = errors.validation(undefined, params);

      expect(error.message).toBe('Invalid parameter provided');
      expect(error.params).toEqual(params);
    });

    it('should create not found error with endpoint', () => {
      const error = errors.notFound('App not found', 'app');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.NOT_FOUND);
      expect(error.message).toBe('App not found');
      expect(error.endpoint).toBe('app');
    });

    it('should create network error with original error', () => {
      const originalError = new Error('Connection failed');
      const error = errors.network('Network request failed', originalError);

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.NETWORK_ERROR);
      expect(error.message).toBe('Network request failed');
      expect(error.originalError).toBe(originalError);
    });

    it('should create parsing error', () => {
      const originalError = new SyntaxError('Invalid JSON');
      const error = errors.parsing('Failed to parse response', originalError);

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.PARSING_ERROR);
      expect(error.message).toBe('Failed to parse response');
      expect(error.originalError).toBe(originalError);
    });

    it('should create server error', () => {
      const error = errors.server('Internal server error');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.SERVER_ERROR);
      expect(error.message).toBe('Internal server error');
    });

    it('should create rate limit error', () => {
      const error = errors.rateLimit('Too many requests');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.RATE_LIMIT);
      expect(error.message).toBe('Too many requests');
    });

    it('should create app lookup error', () => {
      const params = { id: '123', country: 'us' };
      const error = errors.app('App not found', ErrorCode.APP_NOT_FOUND, undefined, params);

      expect(error instanceof AppLookupError).toBe(true);
      expect(error.code).toBe(ErrorCode.APP_NOT_FOUND);
      expect(error.message).toBe('App not found');
      expect(error.params).toEqual(params);
    });

    it('should create developer error', () => {
      const error = errors.developer('Developer not found');

      expect(error instanceof DeveloperError).toBe(true);
      expect(error.code).toBe(ErrorCode.DEVELOPER_NOT_FOUND);
    });

    it('should create ratings error', () => {
      const error = errors.ratings('Ratings unavailable');

      expect(error instanceof RatingsError).toBe(true);
      expect(error.code).toBe(ErrorCode.RATINGS_UNAVAILABLE);
    });

    it('should create reviews error', () => {
      const error = errors.reviews('Reviews not found');

      expect(error instanceof ReviewsError).toBe(true);
      expect(error.code).toBe(ErrorCode.REVIEW_NOT_FOUND);
    });

    it('should create search error', () => {
      const error = errors.search('Search failed');

      expect(error instanceof SearchError).toBe(true);
      expect(error.code).toBe(ErrorCode.SEARCH_FAILED);
    });
  });

  describe('fromHttpError', () => {
    it('should convert 404 response to not found error with endpoint', () => {
      const httpError = new Error('HTTP 404') as any;
      httpError.response = { statusCode: 404 };

      const error = errors.fromHttpError(httpError, 'app');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.NOT_FOUND);
      expect(error.message).toContain('404');
      expect(error.endpoint).toBe('app');
    });

    it('should convert 429 response to rate limit error', () => {
      const httpError = new Error('HTTP 429') as any;
      httpError.response = { statusCode: 429 };

      const error = errors.fromHttpError(httpError);

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.RATE_LIMIT);
      expect(error.originalError).not.toBeUndefined();
    });

    it('should convert 500 response to server error', () => {
      const httpError = new Error('HTTP 500') as any;
      httpError.response = { statusCode: 500 };

      const error = errors.fromHttpError(httpError);

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.SERVER_ERROR);
      expect(error.message).toContain('500');
      expect(error.originalError).not.toBeUndefined();
    });

    it('should handle non-HTTP errors as network errors', () => {
      const randomError = new Error('Random error');

      const error = errors.fromHttpError(randomError);

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.NETWORK_ERROR);
      expect(error.originalError).not.toBeUndefined();
    });

    it('should convert other status codes to unknown errors with endpoint', () => {
      const httpError = new Error('HTTP 418') as any;
      httpError.response = { statusCode: 418 };

      const error = errors.fromHttpError(httpError, 'search');

      expect(error instanceof AppStoreScraperError).toBe(true);
      expect(error.code).toBe(ErrorCode.UNKNOWN_ERROR);
      expect(error.message).toContain('418');
      expect(error.originalError).not.toBeUndefined();
      expect(error.endpoint).toBe('search');
    });
  });

  describe('Error Categories', () => {
    it('should map specific errors to their parent categories', () => {
      expect(errorCategories[ErrorCode.APP_NOT_FOUND]).toBe(ErrorCode.NOT_FOUND);
      expect(errorCategories[ErrorCode.DEVELOPER_NOT_FOUND]).toBe(ErrorCode.NOT_FOUND);
      expect(errorCategories[ErrorCode.INVALID_PARAMETER]).toBe(ErrorCode.VALIDATION_ERROR);
      expect(errorCategories[ErrorCode.MALFORMED_RESPONSE]).toBe(ErrorCode.PARSING_ERROR);
      expect(errorCategories[ErrorCode.THROTTLING_ERROR]).toBe(ErrorCode.RATE_LIMIT);
    });
  });
});
