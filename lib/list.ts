import * as common from './common.js';
import { validateList } from './validators.js';
import { App } from './common.js';
import { BaseRequestOptions, DetailOptions, PaginationOptions } from './param-types.js';

/**
 * Options for list lookup
 * @interface ListOptions
 * @extends {BaseRequestOptions} - Common request options
 * @extends {DetailOptions} - Options for controlling detail level
 * @extends {Pick<PaginationOptions, 'num'>} - Only using 'num' from pagination options
 */
export interface ListOptions
  extends BaseRequestOptions,
    DetailOptions,
    Pick<PaginationOptions, 'num'> {
  /**
   * The collection to fetch (e.g., 'topfreeapplications', 'toppaidapplications')
   * @type {string}
   */
  collection?: string;
  /**
   * The category to fetch apps from (numeric ID)
   * @type {number}
   */
  category?: number;
}

/**
 * Basic app data returned from the list API
 * @interface ListApp
 */
export interface ListApp {
  /** The app's iTunes ID */
  id: string;
  /** The app's bundle identifier */
  appId: string;
  /** The app's title */
  title: string;
  /** URL to the app's icon image */
  icon: string;
  /** URL to the app's page on the App Store */
  url?: string;
  /** The app's price */
  price: number;
  /** The currency code for the price */
  currency: string;
  /** Whether the app is free */
  free: boolean;
  /** Short description of the app */
  description?: string;
  /** The developer's name */
  developer: string;
  /** URL to the developer's page */
  developerUrl?: string;
  /** The developer's ID */
  developerId?: string;
  /** The app's primary genre/category name */
  genre: string;
  /** The app's primary genre/category ID */
  genreId: string;
  /** The release date of the app */
  released: string;
}

/**
 * Internal list API response format from iTunes
 * @interface ListApiResponse
 * @private
 */
interface ListApiResponse {
  feed: {
    entry: Array<{
      id: {
        attributes: {
          'im:id': string;
          'im:bundleId': string;
        };
      };
      'im:name': {
        label: string;
      };
      'im:image': Array<{
        label: string;
      }>;
      'im:price': {
        attributes: {
          amount: string;
          currency: string;
        };
      };
      'im:artist': {
        label: string;
        attributes?: {
          href: string;
        };
      };
      category: {
        attributes: {
          label: string;
          'im:id': string;
        };
      };
      'im:releaseDate': {
        label: string;
      };
      summary?: {
        label: string;
      };
      link?:
        | Array<{
            attributes: {
              rel: string;
              href: string;
            };
          }>
        | {
            attributes: {
              rel: string;
              href: string;
            };
          };
    }>;
  };
}

/**
 * Extracts the app URL from the link attributes
 * @param {Object} app - App data from iTunes API
 * @returns {string|undefined} The app's URL or undefined if not found
 * @private
 */
function parseLink(app: ListApiResponse['feed']['entry'][0]): string | undefined {
  if (app.link) {
    const linkArray = Array.isArray(app.link) ? app.link : [app.link];
    const link = linkArray.find(link => link.attributes.rel === 'alternate');
    return link && link.attributes.href;
  }
  return undefined;
}

/**
 * Normalizes app data from the list API format to the common app format
 * @param {Object} app - Raw app data from iTunes list API
 * @returns {ListApp} Normalized app data
 * @private
 */
function normalizeListApp(app: ListApiResponse['feed']['entry'][0]): ListApp {
  let developerUrl: string | undefined;
  let developerId: string | undefined;

  if (app['im:artist'].attributes) {
    developerUrl = app['im:artist'].attributes.href;

    if (app['im:artist'].attributes.href.includes('/id')) {
      // some non developer urls can sneak in here
      // e.g. href: 'https://itunes.apple.com/us/artist/sling-tv-llc/959665097?mt=8&uo=2'
      developerId = app['im:artist'].attributes.href.split('/id')[1].split('?mt')[0];
    }
  }

  const price = parseFloat(app['im:price'].attributes.amount);
  return {
    id: app.id.attributes['im:id'],
    appId: app.id.attributes['im:bundleId'],
    title: app['im:name'].label,
    icon: app['im:image'][app['im:image'].length - 1].label,
    url: parseLink(app),
    price,
    currency: app['im:price'].attributes.currency,
    free: price === 0,
    description: app.summary ? app.summary.label : undefined,
    developer: app['im:artist'].label,
    developerUrl,
    developerId,
    genre: app.category.attributes.label,
    genreId: app.category.attributes['im:id'],
    released: app['im:releaseDate'].label
  };
}

/**
 * Fetches a list of apps from the App Store
 *
 * @param {ListOptions} opts - The options object for list request
 * @param {string} [opts.collection] - The collection to fetch (e.g., 'topfreeapplications')
 * @param {number} [opts.category] - The category to fetch apps from (numeric ID)
 * @param {string} [opts.country='us'] - The two-letter country code to get app data from
 * @param {string} [opts.lang] - The language code for localized data
 * @param {number} [opts.num=50] - Number of results to return
 * @param {boolean} [opts.fullDetail=false] - If true, returns full app details instead of list data
 * @param {Object} [opts.requestOptions] - Options for the underlying HTTP request
 * @param {number} [opts.throttle] - Rate limit for requests in requests per second
 * @returns {Promise<App[] | ListApp[]>} Promise resolving to an array of apps (full details if fullDetail is true)
 * @throws {Error} If collection is not provided or list request fails
 * @template T - Type extending ListOptions to handle fullDetail typing
 */
function list<T extends ListOptions = ListOptions>(
  opts: T = {} as T
): Promise<T['fullDetail'] extends true ? App[] : ListApp[]> {
  validateList(opts);

  const category = opts.category ? `/genre=${opts.category}` : '';
  const storeId = common.storeId(opts.country);
  const url = `http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/${opts.collection}/${category}/limit=${opts.num}/json?s=${storeId}`;

  return common
    .request(url, {}, opts.requestOptions)
    .then((body: string) => JSON.parse(body) as ListApiResponse)
    .then((results: ListApiResponse) => {
      const apps = results.feed.entry;

      if (opts.fullDetail) {
        const ids = apps.map(app => app.id.attributes['im:id']);
        return common.lookup(
          ids,
          'id',
          opts.country,
          opts.lang,
          opts.requestOptions,
          opts.throttle
        ) as any;
      }

      return Promise.resolve(apps.map(normalizeListApp)) as any;
    });
}

export default list;
