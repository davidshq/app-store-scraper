/**
 * Type definitions for app-store-scraper
 */

declare module 'app-store-scraper' {
  // Constants
  export const category: {
    BOOKS: number;
    BUSINESS: number;
    CATALOGS: number;
    EDUCATION: number;
    ENTERTAINMENT: number;
    FINANCE: number;
    FOOD_AND_DRINK: number;
    GAMES: number;
    HEALTH_AND_FITNESS: number;
    LIFESTYLE: number;
    MAGAZINES_AND_NEWSPAPERS: number;
    MEDICAL: number;
    MUSIC: number;
    NAVIGATION: number;
    NEWS: number;
    PHOTO_AND_VIDEO: number;
    PRODUCTIVITY: number;
    REFERENCE: number;
    SHOPPING: number;
    SOCIAL_NETWORKING: number;
    SPORTS: number;
    TRAVEL: number;
    UTILITIES: number;
    WEATHER: number;
  };

  export const collection: {
    TOP_MAC: string;
    TOP_FREE_MAC: string;
    TOP_GROSSING_MAC: string;
    TOP_PAID_MAC: string;
    NEW_IOS: string;
    NEW_FREE_IOS: string;
    NEW_PAID_IOS: string;
    TOP_FREE_IOS: string;
    TOP_FREE_GAMES_IOS: string;
    TOP_GROSSING_IOS: string;
    TOP_GROSSING_GAMES_IOS: string;
    TOP_PAID_IOS: string;
    TOP_PAID_GAMES_IOS: string;
  };

  export const sort: {
    RECENT: string;
    HELPFUL: string;
  };

  // Common Options Types
  interface BaseOptions {
    country?: string;
    lang?: string;
    requestOptions?: any;
    throttle?: number;
  }

  interface AppIdentifier {
    id?: number;
    appId?: string;
  }

  // Result Types
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
  }

  export interface Review {
    id: string;
    userName: string;
    userUrl: string;
    version: string;
    score: number;
    title: string;
    text: string;
    url: string;
    updated: string;
  }

  export interface ReviewsResult {
    reviews: Review[];
    nextPage?: number;
  }

  export interface RatingsResult {
    ratings: number;
    histogram: {
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
    };
  }

  export interface SuggestResult {
    term: string;
    priority: number;
    phrase: string;
  }

  // Function Specific Option Types
  export interface AppOptions extends BaseOptions, AppIdentifier {
    ratings?: boolean;
  }

  export interface ListOptions extends BaseOptions {
    collection?: string;
    category?: number;
    num?: number;
  }

  export interface SearchOptions extends BaseOptions {
    term: string;
    num?: number;
    page?: number;
    limit?: number;
  }

  export interface DeveloperOptions extends BaseOptions {
    devId: number;
    num?: number;
  }

  export interface PrivacyOptions extends BaseOptions, AppIdentifier {}

  export interface SuggestOptions extends BaseOptions {
    term: string;
    limit?: number;
  }

  export interface SimilarOptions extends BaseOptions, AppIdentifier {}

  export interface ReviewsOptions extends BaseOptions, AppIdentifier {
    sort?: string;
    page?: number;
    limit?: number;
  }

  export interface RatingsOptions extends BaseOptions, AppIdentifier {}

  export interface VersionHistoryOptions extends BaseOptions, AppIdentifier {}

  // Cache Options
  export interface CacheOptions {
    primitive?: boolean;
    normalizer?: Function;
    maxAge?: number;
    max?: number;
    promise?: boolean;
    profileName?: string;
  }

  // Function Signatures
  export function app(options: AppOptions): Promise<App>;
  export function list(options: ListOptions): Promise<App[]>;
  export function search(options: SearchOptions): Promise<App[]>;
  export function developer(options: DeveloperOptions): Promise<App[]>;
  export function privacy(options: PrivacyOptions): Promise<any>;
  export function suggest(options: SuggestOptions): Promise<SuggestResult[]>;
  export function similar(options: SimilarOptions): Promise<App[]>;
  export function reviews(options: ReviewsOptions): Promise<ReviewsResult>;
  export function ratings(options: RatingsOptions): Promise<RatingsResult>;
  export function versionHistory(options: VersionHistoryOptions): Promise<any[]>;

  // Caching Utilities
  export function memoized(options?: CacheOptions): any;
  export function configureCaching(
    methodConfigs: Record<string, CacheOptions>,
    defaultOpts?: CacheOptions
  ): any;
  export function clearCache(memoizedApi: any, methodName?: string): void;

  // Default export
  const api: {
    app: typeof app;
    list: typeof list;
    search: typeof search;
    developer: typeof developer;
    privacy: typeof privacy;
    suggest: typeof suggest;
    similar: typeof similar;
    reviews: typeof reviews;
    ratings: typeof ratings;
    versionHistory: typeof versionHistory;
    memoized: typeof memoized;
    configureCaching: typeof configureCaching;
    clearCache: typeof clearCache;
    category: typeof category;
    collection: typeof collection;
    sort: typeof sort;
  };

  export default api;
}
