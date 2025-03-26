import { describe, it, expect } from 'vitest';
import { cleanApp } from '../lib/utils/app-transform.js';
import type { RawAppData } from '../lib/types/app-types.js';

describe('App Transform', () => {
  describe('cleanApp', () => {
    it('should transform raw app data to normalized format', () => {
      const rawData: RawAppData = {
        trackId: 12345,
        bundleId: 'com.example.app',
        trackName: 'Example App',
        trackViewUrl: 'https://apps.apple.com/app/id12345',
        description: 'App description',
        artworkUrl512: 'https://example.com/icon512.png',
        artworkUrl100: 'https://example.com/icon100.png',
        artworkUrl60: 'https://example.com/icon60.png',
        genres: ['Entertainment', 'Games'],
        genreIds: ['6016', '6014'],
        primaryGenreName: 'Entertainment',
        primaryGenreId: 6016,
        contentAdvisoryRating: '12+',
        languageCodesISO2A: ['EN', 'FR', 'DE'],
        fileSizeBytes: '10485760',
        minimumOsVersion: '14.0',
        releaseDate: '2021-01-01T12:00:00Z',
        currentVersionReleaseDate: '2022-02-15T15:30:00Z',
        releaseNotes: 'Bug fixes and improvements',
        version: '2.1.3',
        price: 0,
        currency: 'USD',
        artistId: 98765,
        artistName: 'Example Developer',
        artistViewUrl: 'https://apps.apple.com/developer/id98765',
        sellerUrl: 'https://www.example.com',
        averageUserRating: 4.5,
        userRatingCount: 1250,
        averageUserRatingForCurrentVersion: 4.7,
        userRatingCountForCurrentVersion: 350,
        screenshotUrls: [
          'https://example.com/screenshot1.png',
          'https://example.com/screenshot2.png'
        ],
        ipadScreenshotUrls: ['https://example.com/ipad_screenshot1.png'],
        appletvScreenshotUrls: [],
        supportedDevices: ['iPhone', 'iPad']
      };

      const cleaned = cleanApp(rawData);

      // Test all expected property transformations
      expect(cleaned).toEqual({
        id: 12345,
        appId: 'com.example.app',
        title: 'Example App',
        url: 'https://apps.apple.com/app/id12345',
        description: 'App description',
        icon: 'https://example.com/icon512.png',
        genres: ['Entertainment', 'Games'],
        genreIds: ['6016', '6014'],
        primaryGenre: 'Entertainment',
        primaryGenreId: 6016,
        contentRating: '12+',
        languages: ['EN', 'FR', 'DE'],
        size: '10485760',
        requiredOsVersion: '14.0',
        released: '2021-01-01T12:00:00Z',
        updated: '2022-02-15T15:30:00Z',
        releaseNotes: 'Bug fixes and improvements',
        version: '2.1.3',
        price: 0,
        currency: 'USD',
        free: true,
        developerId: 98765,
        developer: 'Example Developer',
        developerUrl: 'https://apps.apple.com/developer/id98765',
        developerWebsite: 'https://www.example.com',
        score: 4.5,
        reviews: 1250,
        currentVersionScore: 4.7,
        currentVersionReviews: 350,
        screenshots: ['https://example.com/screenshot1.png', 'https://example.com/screenshot2.png'],
        ipadScreenshots: ['https://example.com/ipad_screenshot1.png'],
        appletvScreenshots: [],
        supportedDevices: ['iPhone', 'iPad']
      });
    });

    it('should handle missing optional fields', () => {
      const rawData: RawAppData = {
        trackId: 12345,
        bundleId: 'com.example.app',
        trackName: 'Example App',
        trackViewUrl: 'https://apps.apple.com/app/id12345',
        description: 'App description',
        // Missing artworkUrl512 and artworkUrl100
        artworkUrl60: 'https://example.com/icon60.png',
        genres: ['Entertainment'],
        genreIds: ['6016'],
        primaryGenreName: 'Entertainment',
        primaryGenreId: 6016,
        contentAdvisoryRating: '12+',
        languageCodesISO2A: ['EN'],
        fileSizeBytes: '10485760',
        minimumOsVersion: '14.0',
        releaseDate: '2021-01-01T12:00:00Z',
        // Missing currentVersionReleaseDate
        // Missing releaseNotes
        version: '1.0',
        price: 1.99,
        currency: 'USD',
        artistId: 98765,
        artistName: 'Example Developer',
        artistViewUrl: 'https://apps.apple.com/developer/id98765',
        // Missing sellerUrl
        averageUserRating: 4.5,
        userRatingCount: 1250,
        // Missing averageUserRatingForCurrentVersion
        // Missing userRatingCountForCurrentVersion
        screenshotUrls: [],
        ipadScreenshotUrls: [],
        appletvScreenshotUrls: [],
        supportedDevices: ['iPhone']
      };

      const cleaned = cleanApp(rawData);

      expect(cleaned.icon).toBe('https://example.com/icon60.png');
      expect(cleaned.updated).toBe('2021-01-01T12:00:00Z'); // Should default to releaseDate
      expect(cleaned.free).toBe(false);
      expect(cleaned.developerWebsite).toBeUndefined();
      expect(cleaned.releaseNotes).toBeUndefined();
      expect(cleaned.currentVersionScore).toBeUndefined();
      expect(cleaned.currentVersionReviews).toBeUndefined();
    });

    it('should use fallback icon URLs when higher resolution is not available', () => {
      const rawData: RawAppData = {
        trackId: 12345,
        bundleId: 'com.example.app',
        trackName: 'Example App',
        trackViewUrl: 'https://apps.apple.com/app/id12345',
        description: 'App description',
        // Missing artworkUrl512
        artworkUrl100: 'https://example.com/icon100.png',
        artworkUrl60: 'https://example.com/icon60.png',
        genres: ['Entertainment'],
        genreIds: ['6016'],
        primaryGenreName: 'Entertainment',
        primaryGenreId: 6016,
        contentAdvisoryRating: '12+',
        languageCodesISO2A: ['EN'],
        fileSizeBytes: '10485760',
        minimumOsVersion: '14.0',
        releaseDate: '2021-01-01T12:00:00Z',
        version: '1.0',
        price: 0,
        currency: 'USD',
        artistId: 98765,
        artistName: 'Example Developer',
        artistViewUrl: 'https://apps.apple.com/developer/id98765'
      };

      const cleaned = cleanApp(rawData);
      expect(cleaned.icon).toBe('https://example.com/icon100.png');

      // Test with only artworkUrl60
      const rawData2 = { ...rawData, artworkUrl100: undefined };
      const cleaned2 = cleanApp(rawData2);
      expect(cleaned2.icon).toBe('https://example.com/icon60.png');

      // Test with no artwork
      const rawData3 = {
        ...rawData,
        artworkUrl100: undefined,
        artworkUrl60: undefined
      };
      const cleaned3 = cleanApp(rawData3);
      expect(cleaned3.icon).toBe('');
    });
  });
});
