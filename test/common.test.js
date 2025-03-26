// @ts-nocheck
import { assert } from 'chai';
import * as common from '../dist/lib/common.js';
import sinon from 'sinon';
import Bottleneck from 'bottleneck';

describe('Common utilities', () => {
  describe('Request functionality', () => {
    // Basic tests that don't need to mock internal modules
    it('should export request function', () => {
      // This just verifies that the module exports a request function
      assert.isFunction(common.request, 'request should be a function');
    });

    it('should export lookup function', () => {
      // Verify that lookup is exported
      assert.isFunction(common.lookup, 'lookup should be a function');
    });

    it('should export cleanApp function', () => {
      // Verify that cleanApp is exported
      assert.isFunction(common.cleanApp, 'cleanApp should be a function');
    });

    it('should export storeId function', () => {
      // Verify that storeId is exported
      assert.isFunction(common.storeId, 'storeId should be a function');
    });
  });

  describe('storeId function', () => {
    it('should return default store ID when no country code is provided', () => {
      const defaultStoreId = '143441'; // US store ID

      const result = common.storeId();
      assert.equal(result, defaultStoreId, 'Should return default store ID');
    });

    it('should return store ID for a valid country code', () => {
      const japanStoreId = '143462'; // Japan store ID

      const result = common.storeId('JP');
      assert.equal(result, japanStoreId, 'Should return Japan store ID');
    });

    it('should handle lowercase country codes', () => {
      const ukStoreId = '143444'; // UK store ID

      const result = common.storeId('gb');
      assert.equal(result, ukStoreId, 'Should return UK store ID');
    });

    it('should return default store ID for invalid country code', () => {
      const defaultStoreId = '143441'; // US store ID

      const result = common.storeId('XX'); // Invalid country code
      assert.equal(result, defaultStoreId, 'Should return default store ID for invalid country');
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
      assert.equal(cleanedApp.id, mockAppData.trackId, 'id should match trackId');
      assert.equal(cleanedApp.appId, mockAppData.bundleId, 'appId should match bundleId');
      assert.equal(cleanedApp.title, mockAppData.trackName, 'title should match trackName');
      assert.equal(
        cleanedApp.icon,
        mockAppData.artworkUrl512,
        'icon should use highest resolution available'
      );
      assert.equal(cleanedApp.price, mockAppData.price, 'price should match');
      assert.equal(cleanedApp.free, false, 'app should not be marked as free since price > 0');
      assert.equal(
        cleanedApp.score,
        mockAppData.averageUserRating,
        'score should match averageUserRating'
      );
      assert.equal(
        cleanedApp.developer,
        mockAppData.artistName,
        'developer should match artistName'
      );
      assert.deepEqual(cleanedApp.genres, mockAppData.genres, 'genres should match');
    });

    it('should handle apps with no price', () => {
      const mockAppData = {
        trackId: 123456789,
        bundleId: 'com.example.freeapp',
        trackName: 'Free Example App',
        price: 0
      };

      const cleanedApp = common.cleanApp(mockAppData);
      assert.equal(cleanedApp.free, true, 'app should be marked as free when price is 0');
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
      assert.equal(
        cleanedApp.icon,
        mockAppData.artworkUrl100,
        'icon should fall back to artworkUrl100'
      );

      const mockAppDataNoArtwork = {
        trackId: 123456789,
        bundleId: 'com.example.app',
        trackName: 'Example App',
        // No artwork URLs at all, only artworkUrl60
        artworkUrl60: 'https://example.com/image60.jpg'
      };

      const cleanedAppNoArtwork = common.cleanApp(mockAppDataNoArtwork);
      assert.equal(
        cleanedAppNoArtwork.icon,
        mockAppDataNoArtwork.artworkUrl60,
        'icon should fall back to artworkUrl60'
      );
    });
  });

  describe('createRequestOptions function', () => {
    it('should set default headers, retry and timeout options', () => {
      const headers = { 'User-Agent': 'TestAgent' };
      const options = common.createRequestOptions(headers);

      // Verify headers
      assert.deepEqual(options.headers, headers, 'Headers should be set correctly');

      // Verify retry options
      assert.equal(options.retry.limit, 2, 'Retry limit should be 2');
      assert.deepEqual(options.retry.methods, ['GET'], 'Retry methods should only include GET');

      // Verify timeout options
      assert.equal(options.timeout.request, 30000, 'Request timeout should be 30s');
    });

    it('should merge custom request options', () => {
      const headers = { 'User-Agent': 'TestAgent' };
      const customOptions = {
        followRedirect: false,
        throwHttpErrors: false
      };

      const options = common.createRequestOptions(headers, customOptions);

      // Verify merged options
      assert.deepEqual(options.headers, headers, 'Headers should be set correctly');
      assert.equal(options.followRedirect, false, 'Custom option followRedirect should be set');
      assert.equal(options.throwHttpErrors, false, 'Custom option throwHttpErrors should be set');

      // Verify default options still exist
      assert.equal(options.retry.limit, 2, 'Retry limit should still be set');
      assert.equal(options.timeout.request, 30000, 'Request timeout should still be set');
    });

    it('should handle empty headers and options', () => {
      const options = common.createRequestOptions();

      // Verify default headers
      assert.deepEqual(options.headers, {}, 'Headers should default to empty object');

      // Verify default options still exist
      assert.equal(options.retry.limit, 2, 'Retry limit should still be set');
      assert.equal(options.timeout.request, 30000, 'Request timeout should still be set');
    });
  });

  describe('getLimiter function', () => {
    it('should return default limiter when no limit is provided', () => {
      // Test that the function exists
      assert.isFunction(common.getLimiter, 'getLimiter should be a function');

      // We can't directly test the implementation since we can't check the internal properties
      // But we can verify it returns a Bottleneck instance
      const limiter = common.getLimiter();
      assert.instanceOf(limiter, Bottleneck, 'Should return a Bottleneck instance');
    });

    it('should create a custom limiter when limit is provided', () => {
      // Test a few different limit values by verifying a Bottleneck instance is returned
      const limiter1 = common.getLimiter(1);
      assert.instanceOf(limiter1, Bottleneck, 'Should return a Bottleneck instance');

      const limiter10 = common.getLimiter(10);
      assert.instanceOf(limiter10, Bottleneck, 'Should return a Bottleneck instance');
    });
  });

  describe('createRequester function', () => {
    it('should create a function that makes HTTP requests with rate limiting', () => {
      // Create mocks
      const mockHttpClient = sinon.stub().returns({
        text: sinon.stub().resolves('Success response')
      });

      const mockLimiter = {
        schedule: sinon.stub().callsFake(fn => fn())
      };

      const mockLimiterFactory = sinon.stub().returns(mockLimiter);

      // Create a requester with our mocks
      const requester = common.createRequester(mockHttpClient, mockLimiterFactory);

      // Use the requester
      const url = 'https://example.com/api';
      const headers = { 'User-Agent': 'TestAgent' };
      const requestOptions = { followRedirect: false };
      const limit = 5;

      return requester(url, headers, requestOptions, limit).then(response => {
        // Verify the limiter factory was called with the correct limit
        sinon.assert.calledWith(mockLimiterFactory, limit);

        // Verify the limiter's schedule method was called
        sinon.assert.called(mockLimiter.schedule);

        // Verify the HTTP client was called with the correct URL and options
        sinon.assert.calledWith(mockHttpClient, url);

        // Verify the response
        assert.equal(response, 'Success response');
      });
    });

    it('should handle HTTP errors correctly', () => {
      // Create an error with a response property
      const error = new Error('HTTP Error');
      error.response = { statusCode: 404 };

      // Create mocks
      const mockHttpClient = sinon.stub().returns({
        text: sinon.stub().rejects(error)
      });

      const mockLimiter = {
        schedule: sinon.stub().callsFake(fn => fn())
      };

      const mockLimiterFactory = sinon.stub().returns(mockLimiter);

      // Create a requester with our mocks
      const requester = common.createRequester(mockHttpClient, mockLimiterFactory);

      // Use the requester
      return requester('https://example.com/api').catch(err => {
        // Verify the error has the correct format
        assert.instanceOf(err, Error);
        assert.equal(err.message, 'Request failed with status code 404');
        assert.deepEqual(err.response, { statusCode: 404 });
      });
    });

    it('should handle network errors correctly', () => {
      // Create a network error without a response property
      const error = new Error('Network error');

      // Create mocks
      const mockHttpClient = sinon.stub().returns({
        text: sinon.stub().rejects(error)
      });

      const mockLimiter = {
        schedule: sinon.stub().callsFake(fn => fn())
      };

      const mockLimiterFactory = sinon.stub().returns(mockLimiter);

      // Create a requester with our mocks
      const requester = common.createRequester(mockHttpClient, mockLimiterFactory);

      // Use the requester
      return requester('https://example.com/api').catch(err => {
        // Verify the error was passed through unchanged
        assert.equal(err.message, 'Network error');
      });
    });
  });
});
