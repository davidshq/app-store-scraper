import { describe, it, expect } from 'vitest';
import { storeId } from '../lib/utils/store-utils.js';
import constants from '../lib/constants.js';

describe('Store Utils', () => {
  describe('storeId', () => {
    it('should return correct store ID for US (default)', () => {
      expect(storeId()).toBe(constants.markets.US.toString());
    });

    it('should return correct store ID for specified country code (lowercase)', () => {
      expect(storeId('jp')).toBe(constants.markets.JP.toString());
      expect(storeId('gb')).toBe(constants.markets.GB.toString());
      expect(storeId('fr')).toBe(constants.markets.FR.toString());
    });

    it('should return correct store ID for specified country code (uppercase)', () => {
      expect(storeId('DE')).toBe(constants.markets.DE.toString());
      expect(storeId('IT')).toBe(constants.markets.IT.toString());
      expect(storeId('CA')).toBe(constants.markets.CA.toString());
    });

    it('should return correct store ID for specified country code (mixed case)', () => {
      expect(storeId('Es')).toBe(constants.markets.ES.toString());
      expect(storeId('Au')).toBe(constants.markets.AU.toString());
      expect(storeId('Br')).toBe(constants.markets.BR.toString());
    });

    it('should return US store ID as fallback for unknown country codes', () => {
      expect(storeId('XX')).toBe(constants.markets.US.toString());
      expect(storeId('INVALID')).toBe(constants.markets.US.toString());
      expect(storeId('123')).toBe(constants.markets.US.toString());
    });

    it('should handle empty string by returning US store ID', () => {
      expect(storeId('')).toBe(constants.markets.US.toString());
    });
  });
});
