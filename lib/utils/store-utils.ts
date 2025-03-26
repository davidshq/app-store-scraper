/**
 * Utilities for interacting with the App Store
 */
import c from '../constants.js';

/**
 * Maps a country code to an App Store ID
 * @param {string} [countryCode='us'] - ISO 3166-1 alpha-2 country code
 * @returns {string} App Store ID for the country
 */
export function storeId(countryCode: string = 'us'): string {
  const country = countryCode.toUpperCase();

  if (country in c.markets) {
    return c.markets[country].toString();
  }

  // Return US store as fallback
  return c.markets.US.toString();
}
