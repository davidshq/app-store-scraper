import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RateLimiter } from 'limiter';

// Define types for rate limiter module
interface RateLimiterInstance {
  removeTokens: (tokens: number) => Promise<number>;
}

interface RateLimiterModule {
  getLimiter: (rateLimit?: number) => RateLimiterInstance;
  scheduleWithRateLimit: <T>(fn: () => Promise<T>, rateLimit?: number) => Promise<T>;
}

// Mock RateLimiter type to match what we need for tests
type MockedRateLimiter = {
  removeTokens: ReturnType<typeof vi.fn>;
};

// Mock limiter
vi.mock('limiter', () => {
  const MockRateLimiter = vi.fn(() => ({
    removeTokens: vi.fn(() => Promise.resolve(1)) // Will resolve with remaining tokens
  }));
  return { RateLimiter: MockRateLimiter };
});

describe('Rate Limiter', () => {
  let rateLimiter: RateLimiterModule;
  let getLimiter: (rateLimit?: number) => RateLimiterInstance;
  let scheduleWithRateLimit: <T>(fn: () => Promise<T>, rateLimit?: number) => Promise<T>;
  let mockRateLimiter: ReturnType<typeof vi.mocked<typeof RateLimiter>>;

  beforeEach(async () => {
    // Clear all mocks between tests
    vi.clearAllMocks();

    // Reset modules to ensure we get a fresh instance each time
    vi.resetModules();

    // Import the module fresh for each test to reset state
    rateLimiter = (await import('../lib/utils/rate-limiter.js')) as RateLimiterModule;
    getLimiter = rateLimiter.getLimiter;
    scheduleWithRateLimit = rateLimiter.scheduleWithRateLimit;

    // Get reference to the mocked RateLimiter constructor
    mockRateLimiter = vi.mocked(RateLimiter);
  });

  describe('getLimiter', () => {
    it('should create a new limiter with default rate limit when no limit is specified', () => {
      // Default rate is 5 requests per second
      getLimiter();

      expect(mockRateLimiter).toHaveBeenCalledWith({
        tokensPerInterval: 5,
        interval: 1000
      });
      expect(mockRateLimiter).toHaveBeenCalledTimes(1);
    });

    it('should create a new limiter with specified rate limit', () => {
      getLimiter(10);

      expect(mockRateLimiter).toHaveBeenCalledWith({
        tokensPerInterval: 10,
        interval: 1000
      });
      expect(mockRateLimiter).toHaveBeenCalledTimes(1);
    });

    it('should reuse existing limiter for same rate limit', () => {
      const limiter1 = getLimiter(7);
      const limiter2 = getLimiter(7);

      // Should only create one instance for the same rate limit
      expect(mockRateLimiter).toHaveBeenCalledTimes(1);
      expect(limiter1).toBe(limiter2); // Both should reference the same instance
    });

    it('should create different limiters for different rate limits', () => {
      const limiter1 = getLimiter(5);
      const limiter2 = getLimiter(10);

      // Should create two different instances for different rate limits
      expect(mockRateLimiter).toHaveBeenCalledTimes(2);
      expect(limiter1).not.toBe(limiter2);
    });
  });

  describe('scheduleWithRateLimit', () => {
    it('should schedule function with the limiter', async () => {
      // Setup a mock instance to return from RateLimiter
      const mockRemoveTokens = vi.fn().mockResolvedValue(4); // 4 tokens remaining
      mockRateLimiter.mockImplementation(
        () =>
          ({
            removeTokens: mockRemoveTokens
          }) as unknown as RateLimiter
      );

      const testFn = async (): Promise<string> => 'test result';
      const result = await scheduleWithRateLimit(testFn, 3);

      expect(mockRemoveTokens).toHaveBeenCalledWith(1);
      expect(result).toBe('test result');
    });

    it('should use default limiter when no limit is specified', async () => {
      // Setup a mock instance to return from RateLimiter
      const mockRemoveTokens = vi.fn().mockResolvedValue(4); // 4 tokens remaining
      mockRateLimiter.mockImplementation(
        () =>
          ({
            removeTokens: mockRemoveTokens
          }) as unknown as RateLimiter
      );

      const testFn = async (): Promise<string> => 'default result';
      const result = await scheduleWithRateLimit(testFn);

      expect(mockRemoveTokens).toHaveBeenCalledWith(1);
      expect(result).toBe('default result');
    });

    it('should handle errors from the scheduled function', async () => {
      const error = new Error('Test error');

      // Set up a mock that will successfully remove tokens
      const mockRemoveTokens = vi.fn().mockResolvedValue(4);
      mockRateLimiter.mockImplementation(
        () =>
          ({
            removeTokens: mockRemoveTokens
          }) as unknown as RateLimiter
      );

      const testFn = async (): Promise<never> => {
        throw error;
      };

      await expect(scheduleWithRateLimit(testFn)).rejects.toThrow(error);
      expect(mockRemoveTokens).toHaveBeenCalledWith(1);
    });

    it('should handle errors from token removal', async () => {
      const error = new Error('Token error');

      // Set up a mock that will reject when removing tokens
      const mockRemoveTokens = vi.fn().mockRejectedValue(error);
      mockRateLimiter.mockImplementation(
        () =>
          ({
            removeTokens: mockRemoveTokens
          }) as unknown as RateLimiter
      );

      const testFn = async (): Promise<string> => 'this should never be returned';

      await expect(scheduleWithRateLimit(testFn)).rejects.toThrow(error);
      expect(mockRemoveTokens).toHaveBeenCalledWith(1);
    });
  });
});
