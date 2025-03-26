/**
 * Utilities for interacting with the iTunes API
 */
import { makeRequest } from '../utils/http-client.js';
import { RequestOptions } from '../utils/http-client.js';
import { ITunesApiResponse, App, RawAppData } from '../types/app-types.js';
import { cleanApp } from '../utils/app-transform.js';

/**
 * Looks up app details in iTunes API by app ID(s)
 * @param {(string | number)[]} ids - Array of app IDs to look up
 * @param {string} [idField='id'] - The field to use for ID lookup ('id' or 'bundleId')
 * @param {string} [country='us'] - Country code for the lookup
 * @param {string} [lang] - Language code for localized data
 * @param {RequestOptions} [requestOptions] - Additional request options
 * @param {number} [throttle] - Rate limit for requests
 * @returns {Promise<App[]>} Promise resolving to array of app details
 */
export async function lookup(
  ids: (string | number)[],
  idField: string = 'id',
  country: string = 'us',
  lang?: string,
  requestOptions?: RequestOptions,
  throttle?: number
): Promise<App[]> {
  if (ids.length === 0) {
    return Promise.resolve([]);
  }

  // iTunes API limits lookup to 200 items per call
  const idsStr = ids.slice(0, 200).join(',');
  const countryStr = country ? `&country=${country}` : '';
  const langStr = lang ? `&lang=${lang}` : '';

  const url = `https://itunes.apple.com/lookup?${idField}=${idsStr}${countryStr}${langStr}&entity=software`;

  const response = (await makeRequest({
    url,
    requestOptions,
    limit: throttle,
    parseJson: true
  })) as ITunesApiResponse;

  // Filter out non-software items and transform the raw data to normalized app format
  const apps = response.results
    .filter(
      (app: RawAppData) => typeof app.wrapperType === 'undefined' || app.wrapperType === 'software'
    )
    .map(cleanApp);

  return apps;
}
