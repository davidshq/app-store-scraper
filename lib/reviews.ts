import * as common from './common.js';
import app from './app.js';
import c from './constants.js';
import { validateReviews } from './validators.js';
import { AppIdentifierOptions, BaseRequestOptions, PaginationOptions } from './param-types.js';

/**
 * Options for reviews lookup
 */
export interface ReviewsOptions
  extends AppIdentifierOptions,
    BaseRequestOptions,
    Pick<PaginationOptions, 'page'> {
  /** The sort order (see constants.sort) */
  sort?: string;
}

/**
 * Review object returned by the API
 */
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

/**
 * Internal review API response format
 */
interface ReviewApiResponse {
  feed: {
    entry?:
      | Array<{
          id: { label: string };
          author: {
            name: { label: string };
            uri: { label: string };
          };
          'im:version': { label: string };
          'im:rating': { label: string };
          title: { label: string };
          content: { label: string };
          link: { attributes: { href: string } };
          updated: { label: string };
        }>
      | {
          id: { label: string };
          author: {
            name: { label: string };
            uri: { label: string };
          };
          'im:version': { label: string };
          'im:rating': { label: string };
          title: { label: string };
          content: { label: string };
          link: { attributes: { href: string } };
          updated: { label: string };
        };
  };
}

/**
 * Ensures a value is an array
 * @param {*} value - Value to convert
 * @returns {Array} The value as an array
 */
function ensureArray<T>(value: T | T[] | undefined): T[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

/**
 * Normalizes review data from the iTunes API format
 * @param {Object} results - Raw reviews data from iTunes API
 * @returns {Array<Object>} Array of normalized review objects
 */
function cleanList(results: ReviewApiResponse): Review[] {
  const reviews = ensureArray(results.feed.entry);
  return reviews.map(review => ({
    id: review.id.label,
    userName: review.author.name.label,
    userUrl: review.author.uri.label,
    version: review['im:version'].label,
    score: parseInt(review['im:rating'].label),
    title: review.title.label,
    text: review.content.label,
    url: review.link.attributes.href,
    updated: review.updated.label
  }));
}

/**
 * Fetches reviews for an app
 * @param {ReviewsOptions} opts - The options object
 * @returns {Promise<Review[]>} Promise resolving to an array of reviews
 */
const reviews = (opts: ReviewsOptions): Promise<Review[]> => {
  validateReviews(opts);

  // Resolve the app ID
  const getAppId = opts.id ? Promise.resolve(opts.id) : app(opts).then(appData => appData.id);

  return getAppId
    .then(id => {
      const options = {
        sort: opts.sort || c.sort.RECENT,
        page: opts.page || 1,
        country: opts.country || 'us'
      };

      const url = `https://itunes.apple.com/${options.country}/rss/customerreviews/page=${options.page}/id=${id}/sortby=${options.sort}/json`;
      return common.request(url, {}, opts.requestOptions);
    })
    .then(response => JSON.parse(response) as ReviewApiResponse)
    .then(cleanList);
};

export default reviews;
