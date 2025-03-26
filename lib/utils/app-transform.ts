/**
 * Utilities for transforming app data between formats
 */
import { RawAppData, App } from '../types/app-types.js';

/**
 * Normalizes and cleans app data returned from the iTunes API
 *
 * This function transforms raw API response data into the standardized App format
 * used throughout the library. It handles field mapping, renames fields for clarity,
 * and computes derived properties.
 *
 * @param {RawAppData} app - Raw app data from iTunes API
 * @returns {App} Cleaned and normalized app data with consistent structure
 * @example
 * const rawData = await itunesApiCall();
 * const cleanedApp = cleanApp(rawData.results[0]);
 */
export function cleanApp(app: RawAppData): App {
  return {
    id: app.trackId,
    appId: app.bundleId,
    title: app.trackName,
    url: app.trackViewUrl,
    description: app.description,
    icon: app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60 || '',
    genres: app.genres,
    genreIds: app.genreIds,
    primaryGenre: app.primaryGenreName,
    primaryGenreId: app.primaryGenreId,
    contentRating: app.contentAdvisoryRating,
    languages: app.languageCodesISO2A,
    size: app.fileSizeBytes,
    requiredOsVersion: app.minimumOsVersion,
    released: app.releaseDate,
    updated: app.currentVersionReleaseDate || app.releaseDate,
    releaseNotes: app.releaseNotes,
    version: app.version,
    price: app.price,
    currency: app.currency,
    free: app.price === 0,
    developerId: app.artistId,
    developer: app.artistName,
    developerUrl: app.artistViewUrl,
    developerWebsite: app.sellerUrl,
    score: app.averageUserRating,
    reviews: app.userRatingCount,
    currentVersionScore: app.averageUserRatingForCurrentVersion,
    currentVersionReviews: app.userRatingCountForCurrentVersion,
    screenshots: app.screenshotUrls,
    ipadScreenshots: app.ipadScreenshotUrls,
    appletvScreenshots: app.appletvScreenshotUrls,
    supportedDevices: app.supportedDevices
  };
}
