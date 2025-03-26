import { describe, it, expect } from 'vitest';
import * as validators from '../lib/validators.js';
import { errors, ErrorCode } from '../lib/error-types.js';
import c from '../lib/constants.js';

describe('Validators', () => {
  describe('validateRequired', () => {
    it('should throw validation error when required fields are missing', () => {
      const opts = { field1: 'value1' };
      const requiredFields = ['field1', 'field2', 'field3'];

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateRequired'](opts, requiredFields);
      }).toThrow();

      try {
        // @ts-ignore - Accessing private function
        validators['validateRequired'](opts, requiredFields);
      } catch (error: any) {
        expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
        expect(error.message).toContain('field2');
        expect(error.message).toContain('field3');
      }
    });

    it('should not throw error when all required fields are present', () => {
      const opts = { field1: 'value1', field2: 'value2', field3: 'value3' };
      const requiredFields = ['field1', 'field2', 'field3'];

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateRequired'](opts, requiredFields);
      }).not.toThrow();
    });

    it('should use custom error message when provided', () => {
      const opts = { field1: 'value1' };
      const requiredFields = ['field1', 'field2'];
      const customMessage = 'Custom validation error message';

      try {
        // @ts-ignore - Accessing private function
        validators['validateRequired'](opts, requiredFields, customMessage);
      } catch (error: any) {
        expect(error.message).toBe(customMessage);
      }
    });
  });

  describe('validateEither', () => {
    it('should throw validation error when both fields are missing', () => {
      const opts = { otherField: 'value' };

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateEither'](opts, 'field1', 'field2');
      }).toThrow();

      try {
        // @ts-ignore - Accessing private function
        validators['validateEither'](opts, 'field1', 'field2');
      } catch (error: any) {
        expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
        expect(error.message).toContain('field1');
        expect(error.message).toContain('field2');
      }
    });

    it('should not throw error when first field is present', () => {
      const opts = { field1: 'value1' };

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateEither'](opts, 'field1', 'field2');
      }).not.toThrow();
    });

    it('should not throw error when second field is present', () => {
      const opts = { field2: 'value2' };

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateEither'](opts, 'field1', 'field2');
      }).not.toThrow();
    });
  });

  describe('validateEnum', () => {
    it('should throw validation error when field value is not in valid values', () => {
      const opts = { fruit: 'kiwi' };
      const validValues = ['apple', 'banana', 'orange'];

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateEnum'](opts, 'fruit', validValues);
      }).toThrow();

      try {
        // @ts-ignore - Accessing private function
        validators['validateEnum'](opts, 'fruit', validValues);
      } catch (error: any) {
        expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
        expect(error.message).toContain('kiwi');
        expect(error.message).toContain('apple');
      }
    });

    it('should not throw error when field value is in valid values', () => {
      const opts = { fruit: 'banana' };
      const validValues = ['apple', 'banana', 'orange'];

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateEnum'](opts, 'fruit', validValues);
      }).not.toThrow();
    });

    it('should not throw error when field is not present', () => {
      const opts = {};
      const validValues = ['apple', 'banana', 'orange'];

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateEnum'](opts, 'fruit', validValues);
      }).not.toThrow();
    });
  });

  describe('validateRange', () => {
    it('should throw validation error when field value is below minimum', () => {
      const opts = { age: 15 };

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateRange'](opts, 'age', 18, 100);
      }).toThrow();

      try {
        // @ts-ignore - Accessing private function
        validators['validateRange'](opts, 'age', 18, 100);
      } catch (error: any) {
        expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
        expect(error.message).toContain('at least 18');
      }
    });

    it('should throw validation error when field value is above maximum', () => {
      const opts = { age: 110 };

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateRange'](opts, 'age', 18, 100);
      }).toThrow();

      try {
        // @ts-ignore - Accessing private function
        validators['validateRange'](opts, 'age', 18, 100);
      } catch (error: any) {
        expect(error.code).toBe(ErrorCode.VALIDATION_ERROR);
        expect(error.message).toContain('at most 100');
      }
    });

    it('should not throw error when field value is within range', () => {
      const opts = { age: 25 };

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateRange'](opts, 'age', 18, 100);
      }).not.toThrow();
    });

    it('should not throw error when field is not present', () => {
      const opts = {};

      expect(() => {
        // @ts-ignore - Accessing private function
        validators['validateRange'](opts, 'age', 18, 100);
      }).not.toThrow();
    });
  });

  // Test public validation functions
  describe('validateApp', () => {
    it('should throw error when both id and appId are missing', () => {
      const opts = { country: 'us', lang: 'en' } as any;

      expect(() => {
        validators.validateApp(opts);
      }).toThrow();
    });

    it('should not throw error when id is provided', () => {
      const opts = { id: '12345', country: 'us', lang: 'en' };

      expect(() => {
        validators.validateApp(opts);
      }).not.toThrow();
    });

    it('should not throw error when appId is provided', () => {
      const opts = { appId: 'com.example.app', country: 'us', lang: 'en' };

      expect(() => {
        validators.validateApp(opts);
      }).not.toThrow();
    });
  });

  describe('validateList', () => {
    it('should throw error when collection is invalid', () => {
      const opts = {
        collection: 'invalidCollection',
        country: 'us',
        lang: 'en'
      };

      expect(() => {
        validators.validateList(opts);
      }).toThrow();
    });

    it('should not throw error with valid parameters', () => {
      const opts = {
        collection: c.collection.TOP_FREE_IOS,
        country: 'us',
        lang: 'en'
      };

      expect(() => {
        validators.validateList(opts);
      }).not.toThrow();
    });
  });
});
