import * as common from './common.js';
import { validateList, ListValidationOptions } from './validators.js';
import { App } from './common.js';

/**
 * Options for list lookup
 */
export interface ListOptions extends ListValidationOptions {
  collection?: string;
  category?: number;
  country?: string;
  num?: number;
  fullDetail?: boolean;
  requestOptions?: common.RequestOptions;
  lang?: string;
  throttle?: number;
}

/**
 * Basic app data returned from the list API
 */
export interface ListApp {
  id: string;
  appId: string;
  title: string;
  icon: string;
  url?: string;
  price: number;
  currency: string;
  free: boolean;
  description?: string;
  developer: string;
  developerUrl?: string;
  developerId?: string;
  genre: string;
  genreId: string;
  released: string;
}

/**
 * Internal list API response format
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
 * @returns {Object} Normalized app data ready for common cleaning
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
 * @param {Object} opts - The options object
 * @param {string} [opts.collection=TOP_FREE_IOS] - The collection to fetch
 * @param {number} [opts.category] - The category to fetch
 * @param {string} [opts.country='us'] - The country code
 * @param {number} [opts.num=50] - Number of apps to retrieve (max 200)
 * @param {boolean} [opts.fullDetail=false] - If true, fetches full app details
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @param {string} [opts.lang] - Language code for the response
 * @param {number} [opts.throttle] - Maximum number of requests per second
 * @returns {Promise<Array>} Promise resolving to an array of apps
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
