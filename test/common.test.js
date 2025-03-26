// @ts-nocheck
import { describe, it, expect, vi } from 'vitest';
import * as common from '../dist/lib/common.js';
import Bottleneck from 'bottleneck';

describe('Common utilities', () => {
  describe('Request functionality', () => {
    // Basic tests that don't need to mock internal modules
    it('should export request function', () => {
      // This just verifies that the module exports a request function
      expect(common.request).toBeTypeOf('function');
    });

    it('should export lookup function', () => {
      // Verify that lookup is exported
      expect(common.lookup).toBeTypeOf('function');
    });

    it('should export cleanApp function', () => {
      // Verify that cleanApp is exported
      expect(common.cleanApp).toBeTypeOf('function');
    });

    it('should export storeId function', () => {
      // Verify that storeId is exported
      expect(common.storeId).toBeTypeOf('function');
    });
  });

  describe('storeId function', () => {
    it('should return default store ID when no country code is provided', () => {
      const defaultStoreId = '143441'; // US store ID

      const result = common.storeId();
      expect(result).toBe(defaultStoreId);
    });

    it('should return store ID for a valid country code', () => {
      const japanStoreId = '143462'; // Japan store ID

      const result = common.storeId('JP');
      expect(result).toBe(japanStoreId);
    });

    it('should handle lowercase country codes', () => {
      const ukStoreId = '143444'; // UK store ID

      const result = common.storeId('gb');
      expect(result).toBe(ukStoreId);
    });

    it('should return default store ID for invalid country code', () => {
      const defaultStoreId = '143441'; // US store ID

      const result = common.storeId('XX'); // Invalid country code
      expect(result).toBe(defaultStoreId);
    });
  });

  describe('cleanApp function', () => {
    it('should format app data correctly', () => {
      const mockAppData = {
        trackId: 123456789,
        bundleId: 'com.example.app',
        trackName: 'Example App',
        trackViewUrl: 'https://apps.apple.com/us/app/example-app/id123456789',
        description: 'This is an example app',
        artworkUrl512: 'https://example.com/image512.jpg',
        genres: ['Utilities', 'Productivity'],
        genreIds: [6002, 6007],
        primaryGenreName: 'Utilities',
        primaryGenreId: 6002,
        contentAdvisoryRating: '4+',
        languageCodesISO2A: ['EN', 'ES', 'FR'],
        fileSizeBytes: '100000000',
        minimumOsVersion: '13.0',
        releaseDate: '2023-01-01',
        currentVersionReleaseDate: '2023-02-01',
        releaseNotes: 'Bug fixes and improvements',
        version: '1.0.1',
        price: 1.99,
        currency: 'USD',
        artistId: 987654321,
        artistName: 'Example Developer',
        artistViewUrl: 'https://apps.apple.com/us/developer/example-developer/id987654321',
        sellerUrl: 'https://www.example.com',
        averageUserRating: 4.5,
        userRatingCount: 1000,
        averageUserRatingForCurrentVersion: 4.7,
        userRatingCountForCurrentVersion: 500,
        screenshotUrls: ['https://example.com/screenshot1.jpg'],
        ipadScreenshots: ['https://example.com/ipad-screenshot1.jpg'],
        appletvScreenshots: ['https://example.com/appletv-screenshot1.jpg'],
        supportedDevices: ['iPhone', 'iPad']
      };

      const cleanedApp = common.cleanApp(mockAppData);

      // Check key properties
      expect(cleanedApp.id).toBe(mockAppData.trackId);
      expect(cleanedApp.appId).toBe(mockAppData.bundleId);
      expect(cleanedApp.title).toBe(mockAppData.trackName);
      expect(cleanedApp.icon).toBe(mockAppData.artworkUrl512);
      expect(cleanedApp.price).toBe(mockAppData.price);
      expect(cleanedApp.free).toBe(false);
      expect(cleanedApp.score).toBe(mockAppData.averageUserRating);
      expect(cleanedApp.developer).toBe(mockAppData.artistName);
      expect(cleanedApp.genres).toEqual(mockAppData.genres);
    });

    it('should handle apps with no price', () => {
      const mockAppData = {
        trackId: 123456789,
        bundleId: 'com.example.freeapp',
        trackName: 'Free Example App',
        price: 0
      };

      const cleanedApp = common.cleanApp(mockAppData);
      expect(cleanedApp.free).toBe(true);
    });

    it('should handle missing artwork URLs gracefully', () => {
      const mockAppData = {
        trackId: 123456789,
        bundleId: 'com.example.app',
        trackName: 'Example App',
        artworkUrl100: 'https://example.com/image100.jpg'
        // No artworkUrl512
      };

      const cleanedApp = common.cleanApp(mockAppData);
      expect(cleanedApp.icon).toBe(mockAppData.artworkUrl100);

      const mockAppDataNoArtwork = {
        trackId: 123456789,
        bundleId: 'com.example.app',
        trackName: 'Example App',
        // No artwork URLs at all, only artworkUrl60
        artworkUrl60: 'https://example.com/image60.jpg'
      };

      const cleanedAppNoArtwork = common.cleanApp(mockAppDataNoArtwork);
      expect(cleanedAppNoArtwork.icon).toBe(mockAppDataNoArtwork.artworkUrl60);
    });
  });

  describe('createRequestOptions function', () => {
    it('should set default headers, retry and timeout options', () => {
      const headers = { 'User-Agent': 'TestAgent' };
      const options = common.createRequestOptions(headers);

      // Verify headers
      expect(options.headers).toEqual(headers);

      // Verify retry options
      expect(options.retry.limit).toBe(2);
      expect(options.retry.methods).toEqual(['GET']);

      // Verify timeout options
      expect(options.timeout.request).toBe(30000);
    });

    it('should merge custom request options', () => {
      const headers = { 'User-Agent': 'TestAgent' };
      const customOptions = {
        followRedirect: false,
        throwHttpErrors: false
      };

      const options = common.createRequestOptions(headers, customOptions);

      // Verify merged options
      expect(options.headers).toEqual(headers);
      expect(options.followRedirect).toBe(false);
      expect(options.throwHttpErrors).toBe(false);

      // Verify default options still exist
      expect(options.retry.limit).toBe(2);
      expect(options.timeout.request).toBe(30000);
    });

    it('should handle empty headers and options', () => {
      const options = common.createRequestOptions();

      // Verify default headers
      expect(options.headers).toEqual({});

      // Verify default options still exist
      expect(options.retry.limit).toBe(2);
      expect(options.timeout.request).toBe(30000);
    });
  });

  describe('getLimiter function', () => {
    it('should return default limiter when no limit is provided', () => {
      // Test that the function exists
      expect(common.getLimiter).toBeTypeOf('function');

      // We can't directly test the implementation since we can't check the internal properties
      // But we can verify it returns a Bottleneck instance
      const limiter = common.getLimiter();
      expect(limiter).toBeInstanceOf(Bottleneck);
    });

    it('should create a custom limiter when limit is provided', () => {
      // Test a few different limit values by verifying a Bottleneck instance is returned
      const limiter1 = common.getLimiter(1);
      expect(limiter1).toBeInstanceOf(Bottleneck);

      const limiter10 = common.getLimiter(10);
      expect(limiter10).toBeInstanceOf(Bottleneck);
    });
  });

  describe('createRequester function', () => {
    it('should create a function that makes HTTP requests with rate limiting', async () => {
      // Create a mock HTTP client function that returns a Promise resolving to an object with a text method
      const mockTextFn = vi.fn().mockResolvedValue('Success response');
      const mockHttpClient = vi.fn().mockImplementation(() => {
        return { text: mockTextFn };
      });

      // Create a mock limiter that just executes the callback immediately
      const mockLimiter = {
        schedule: vi.fn().mockImplementation(fn => fn())
      };

      // Create a mock limiter factory that returns our mock limiter
      const mockLimiterFactory = vi.fn().mockReturnValue(mockLimiter);

      // Create a requester with our mocks
      const requester = common.createRequester(mockHttpClient, mockLimiterFactory);

      // Verify the requester is a function
      expect(requester).toBeTypeOf('function');

      // Test the requester
      const url = 'https://example.com';
      const result = await requester(url);

      // Verify our mocks were called correctly
      expect(result).toBe('Success response');
      expect(mockHttpClient).toHaveBeenCalledWith(url, expect.any(Object));
      expect(mockLimiter.schedule).toHaveBeenCalled();
      expect(mockTextFn).toHaveBeenCalled();
    });

    it('should handle HTTP errors correctly', async () => {
      // Create a mock API error with response information
      const errorResponse = {
        statusCode: 404
      };

      // Create a mock text function that rejects with an error
      const apiError = new Error('API Error');
      apiError.response = errorResponse;

      const mockTextFn = vi.fn().mockRejectedValue(apiError);

      // Create a mock HTTP client that returns an object with our failing text method
      const mockHttpClient = vi.fn().mockImplementation(() => {
        return { text: mockTextFn };
      });

      // Create a mock limiter that just executes the callback immediately
      const mockLimiter = {
        schedule: vi.fn().mockImplementation(fn => fn())
      };

      // Create a mock limiter factory
      const mockLimiterFactory = vi.fn().mockReturnValue(mockLimiter);

      // Create a requester with our mocks
      const requester = common.createRequester(mockHttpClient, mockLimiterFactory);

      // Test the requester with error
      try {
        await requester('https://example.com');
        // Should not reach here
        expect(true).toBe(false);
      } catch (e) {
        // Verify the error has the expected structure
        expect(e.message).toContain('Request failed with status code');
        expect(e.response).toHaveProperty('statusCode', 404);
      }
    });

    it('should handle network errors correctly', async () => {
      // Create a network error
      const networkError = new Error('Network Error');

      // Create a mock text function that rejects with a network error
      const mockTextFn = vi.fn().mockRejectedValue(networkError);

      // Create a mock HTTP client that returns an object with our failing text method
      const mockHttpClient = vi.fn().mockImplementation(() => {
        return { text: mockTextFn };
      });

      // Create a mock limiter that just executes the callback immediately
      const mockLimiter = {
        schedule: vi.fn().mockImplementation(fn => fn())
      };

      // Create a mock limiter factory
      const mockLimiterFactory = vi.fn().mockReturnValue(mockLimiter);

      // Create a requester with our mocks
      const requester = common.createRequester(mockHttpClient, mockLimiterFactory);

      // Test the requester with error
      try {
        await requester('https://example.com');
        // Should not reach here
        expect(true).toBe(false);
      } catch (e) {
        // Verify the error was passed through unchanged
        expect(e.message).toBe('Network Error');
      }
    });
  });
});
