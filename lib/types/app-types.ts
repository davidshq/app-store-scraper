/**
 * Type definitions for App Store app data
 * @module app-types
 */

/**
 * Interface for raw app data from iTunes API
 * @interface RawAppData
 * @description Raw data structure returned by the iTunes API before normalization
 */
export interface RawAppData {
  /** iTunes app ID */
  trackId: number;
  /** App bundle identifier (e.g., 'com.example.app') */
  bundleId: string;
  /** App name/title */
  trackName: string;
  /** URL to the app's page on the App Store */
  trackViewUrl: string;
  /** Full app description */
  description: string;
  /** URL to 512px app icon */
  artworkUrl512?: string;
  /** URL to 100px app icon */
  artworkUrl100?: string;
  /** URL to 60px app icon */
  artworkUrl60?: string;
  /** List of app genres/categories */
  genres: string[];
  /** List of genre/category IDs */
  genreIds: string[];
  /** Primary genre/category name */
  primaryGenreName: string;
  /** Primary genre/category ID */
  primaryGenreId: number;
  /** Age rating (e.g., '4+', '12+', '17+') */
  contentAdvisoryRating: string;
  /** ISO 2-letter language codes supported by the app */
  languageCodesISO2A: string[];
  /** App size in bytes (as string) */
  fileSizeBytes: string;
  /** Minimum iOS version required */
  minimumOsVersion: string;
  /** Initial release date (ISO format) */
  releaseDate: string;
  /** Release date of the current version (ISO format) */
  currentVersionReleaseDate?: string;
  /** Notes for the current version update */
  releaseNotes?: string;
  /** Current app version string */
  version: string;
  /** App price in local currency (0 for free apps) */
  price: number;
  /** Currency code for the price */
  currency: string;
  /** Developer/artist ID */
  artistId: number;
  /** Developer/artist name */
  artistName: string;
  /** URL to the developer's page on the App Store */
  artistViewUrl: string;
  /** URL to the developer's website */
  sellerUrl?: string;
  /** Average user rating (0-5) */
  averageUserRating: number;
  /** Number of user ratings */
  userRatingCount: number;
  /** Average user rating for the current version (0-5) */
  averageUserRatingForCurrentVersion?: number;
  /** Number of user ratings for the current version */
  userRatingCountForCurrentVersion?: number;
  /** URLs to iPhone screenshots */
  screenshotUrls: string[];
  /** URLs to iPad screenshots */
  ipadScreenshotUrls: string[];
  /** URLs to Apple TV screenshots */
  appletvScreenshotUrls: string[];
  /** List of device models compatible with the app */
  supportedDevices: string[];
  /** Type of item (should be 'software' for apps) */
  wrapperType?: string;
  /** Additional properties that may be included in the API response */
  [key: string]: any;
}

/**
 * Interface for cleaned and normalized app data
 * @interface App
 * @description Standardized app data format used throughout the library
 */
export interface App {
  /** iTunes app ID (numeric) */
  id: number;
  /** App bundle identifier (e.g., 'com.example.app') */
  appId: string;
  /** App name/title */
  title: string;
  /** URL to the app's page on the App Store */
  url: string;
  /** Full app description */
  description: string;
  /** URL to the app's icon (highest available resolution) */
  icon: string;
  /** List of app genres/categories */
  genres: string[];
  /** List of genre/category IDs */
  genreIds: string[];
  /** Primary genre/category name */
  primaryGenre: string;
  /** Primary genre/category ID */
  primaryGenreId: number;
  /** Age rating (e.g., '4+', '12+', '17+') */
  contentRating: string;
  /** ISO 2-letter language codes supported by the app */
  languages: string[];
  /** App size (formatted) */
  size: string;
  /** Minimum iOS version required */
  requiredOsVersion: string;
  /** Initial release date (ISO format) */
  released: string;
  /** Last update date (ISO format) */
  updated: string;
  /** Notes for the current version update */
  releaseNotes?: string;
  /** Current app version string */
  version: string;
  /** App price in local currency (0 for free apps) */
  price: number;
  /** Currency code for the price */
  currency: string;
  /** Whether the app is free */
  free: boolean;
  /** Developer ID */
  developerId: number;
  /** Developer name */
  developer: string;
  /** URL to the developer's page on the App Store */
  developerUrl: string;
  /** URL to the developer's website (if available) */
  developerWebsite?: string;
  /** Average user rating (0-5) */
  score: number;
  /** Number of user ratings */
  reviews: number;
  /** Average user rating for the current version (0-5) */
  currentVersionScore?: number;
  /** Number of user ratings for the current version */
  currentVersionReviews?: number;
  /** URLs to iPhone screenshots */
  screenshots: string[];
  /** URLs to iPad screenshots */
  ipadScreenshots: string[];
  /** URLs to Apple TV screenshots */
  appletvScreenshots: string[];
  /** List of device models compatible with the app */
  supportedDevices: string[];
  /** Total number of ratings (may be available from ratings endpoint) */
  ratings?: number;
  /** Distribution of ratings by star count (1-5) */
  histogram?: { [key: string]: number };
}

/**
 * Interface for iTunes API response
 * @interface ITunesApiResponse
 * @description Root response structure from the iTunes API
 */
export interface ITunesApiResponse {
  /** Number of results returned */
  resultCount: number;
  /** Array of app data results */
  results: RawAppData[];
}
