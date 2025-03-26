/**
 * Type definitions for App Store app data
 */

/**
 * Interface for raw app data from iTunes API
 */
export interface RawAppData {
  trackId: number;
  bundleId: string;
  trackName: string;
  trackViewUrl: string;
  description: string;
  artworkUrl512?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
  genres: string[];
  genreIds: string[];
  primaryGenreName: string;
  primaryGenreId: number;
  contentAdvisoryRating: string;
  languageCodesISO2A: string[];
  fileSizeBytes: string;
  minimumOsVersion: string;
  releaseDate: string;
  currentVersionReleaseDate?: string;
  releaseNotes?: string;
  version: string;
  price: number;
  currency: string;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  sellerUrl?: string;
  averageUserRating: number;
  userRatingCount: number;
  averageUserRatingForCurrentVersion?: number;
  userRatingCountForCurrentVersion?: number;
  screenshotUrls: string[];
  ipadScreenshotUrls: string[];
  appletvScreenshotUrls: string[];
  supportedDevices: string[];
  wrapperType?: string;
  [key: string]: any;
}

/**
 * Interface for cleaned and normalized app data
 */
export interface App {
  id: number;
  appId: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  genres: string[];
  genreIds: string[];
  primaryGenre: string;
  primaryGenreId: number;
  contentRating: string;
  languages: string[];
  size: string;
  requiredOsVersion: string;
  released: string;
  updated: string;
  releaseNotes?: string;
  version: string;
  price: number;
  currency: string;
  free: boolean;
  developerId: number;
  developer: string;
  developerUrl: string;
  developerWebsite?: string;
  score: number;
  reviews: number;
  currentVersionScore?: number;
  currentVersionReviews?: number;
  screenshots: string[];
  ipadScreenshots: string[];
  appletvScreenshots: string[];
  supportedDevices: string[];
  ratings?: number;
  histogram?: { [key: string]: number };
}

/**
 * Interface for iTunes API response
 */
export interface ITunesApiResponse {
  resultCount: number;
  results: RawAppData[];
}
