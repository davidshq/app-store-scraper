import * as common from './common.js';
import { parseString } from 'xml2js';
import { validateRequired } from './validators.js';
import { ApiRequestOptions } from './param-utils.js';

/**
 * Options for app suggestion lookup
 */
export interface SuggestOptions extends ApiRequestOptions {
  term: string;
  country?: string;
  requestOptions?: common.RequestOptions;
}

/**
 * Suggestion result format
 */
export interface Suggestion {
  term: string;
}

/**
 * Internal XML structure after parsing
 */
interface SuggestXml {
  plist: {
    dict: Array<{
      array: Array<{
        dict?: Array<{
          string: string[];
        }>;
      }>;
    }>;
  };
}

const BASE_URL =
  'https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?clientApplication=Software&term=';

/**
 * Converts XML string to JSON using xml2js
 * @param {string} string - XML string to parse
 * @returns {Promise<Object>} Promise resolving to parsed XML as JSON
 * @private
 */
function parseXML(string: string): Promise<SuggestXml> {
  return new Promise(function (resolve, reject) {
    parseString(string, (err, res: unknown) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res as SuggestXml);
    });
  });
}

/**
 * Extracts search term suggestions from parsed XML
 * @param {Object} xml - Parsed XML object from iTunes API
 * @returns {Array<Object>} Array of suggestion objects with term property
 * @private
 */
function extractSuggestions(xml: SuggestXml): Suggestion[] {
  const toJSON = (item: { string: string[] }): Suggestion => ({
    term: item.string[0]
  });

  const list = xml.plist.dict[0].array[0].dict || [];
  return list.map(toJSON);
}

// TODO see language Accept-Language: en-us, en;q=0.50

/**
 * Fetches search term suggestions from the App Store
 * @param {Object} opts - The options object
 * @param {string} opts.term - The search term to get suggestions for
 * @param {string} [opts.country='us'] - The country code for the App Store
 * @param {Object} [opts.requestOptions] - Additional options for the request
 * @returns {Promise<Array>} Promise resolving to an array of term suggestions
 * @throws {Error} If term is not provided
 */
function suggest(opts: SuggestOptions): Promise<Suggestion[]> {
  return new Promise<string>(function (resolve) {
    validateRequired(opts, ['term'], 'term missing');
    return resolve(BASE_URL + encodeURIComponent(opts.term));
  })
    .then(url =>
      common.request(
        url,
        { 'X-Apple-Store-Front': `${common.storeId(opts.country)},29` },
        opts.requestOptions
      )
    )
    .then(parseXML)
    .then(extractSuggestions);
}

export default suggest;
