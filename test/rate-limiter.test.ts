import { describe, it, expect, vi, beforeEach } from 'vitest';
import Bottleneck from 'bottleneck';

// Mock Bottleneck
vi.mock('bottleneck', () => {
  const MockBottleneck = vi.fn(() => ({
    schedule: vi.fn(fn => fn())
  }));
  return { default: MockBottleneck };
});

describe('Rate Limiter', () => {
  let rateLimiter;
  let getLimiter;
  let scheduleWithRateLimit;
  let mockBottleneck;

  beforeEach(async () => {
    // Clear all mocks between tests
    vi.clearAllMocks();

    // Reset modules to ensure we get a fresh instance each time
    vi.resetModules();

    // Import the module fresh for each test to reset state
    rateLimiter = await import('../lib/utils/rate-limiter.js');
    getLimiter = rateLimiter.getLimiter;
    scheduleWithRateLimit = rateLimiter.scheduleWithRateLimit;

    // Get reference to the mocked Bottleneck constructor
    mockBottleneck = vi.mocked(Bottleneck);
  });

  describe('getLimiter', () => {
    it('should create a new limiter with default rate limit when no limit is specified', () => {
      // Default rate is 5 requests per second
      getLimiter();

      expect(mockBottleneck).toHaveBeenCalledWith({
        maxConcurrent: 5,
        minTime: 200 // 1000ms / 5 = 200ms
      });
      expect(mockBottleneck).toHaveBeenCalledTimes(1);
    });

    it('should create a new limiter with specified rate limit', () => {
      getLimiter(10);

      expect(mockBottleneck).toHaveBeenCalledWith({
        maxConcurrent: 10,
        minTime: 100 // 1000ms / 10 = 100ms
      });
      expect(mockBottleneck).toHaveBeenCalledTimes(1);
    });

    it('should reuse existing limiter for same rate limit', () => {
      const limiter1 = getLimiter(7);
      const limiter2 = getLimiter(7);

      // Should only create one instance for the same rate limit
      expect(mockBottleneck).toHaveBeenCalledTimes(1);
      expect(limiter1).toBe(limiter2); // Both should reference the same instance
    });

    it('should create different limiters for different rate limits', () => {
      const limiter1 = getLimiter(5);
      const limiter2 = getLimiter(10);

      // Should create two different instances for different rate limits
      expect(mockBottleneck).toHaveBeenCalledTimes(2);
      expect(limiter1).not.toBe(limiter2);
    });
  });

  describe('scheduleWithRateLimit', () => {
    it('should schedule function with the limiter', async () => {
      // Setup a mock instance to return from Bottleneck
      const mockSchedule = vi.fn().mockResolvedValue('test result');
      mockBottleneck.mockImplementation(() => ({
        schedule: mockSchedule
      }));

      const testFn = async () => 'test result';
      await scheduleWithRateLimit(testFn, 3);

      expect(mockSchedule).toHaveBeenCalledWith(testFn);
    });

    it('should use default limiter when no limit is specified', async () => {
      // Setup a mock instance to return from Bottleneck
      const mockSchedule = vi.fn().mockResolvedValue('default result');
      mockBottleneck.mockImplementation(() => ({
        schedule: mockSchedule
      }));

      const testFn = async () => 'default result';
      await scheduleWithRateLimit(testFn);

      expect(mockSchedule).toHaveBeenCalledWith(testFn);
    });

    it('should handle errors from the scheduled function', async () => {
      const error = new Error('Test error');

      // Set up a mock that will call the function and let errors propagate
      const mockSchedule = vi.fn().mockImplementation(fn => fn());
      mockBottleneck.mockImplementation(() => ({
        schedule: mockSchedule
      }));

      const testFn = async () => {
        throw error;
      };

      await expect(scheduleWithRateLimit(testFn)).rejects.toThrow(error);
    });

    it('should handle errors from bottleneck scheduling', async () => {
      const error = new Error('Bottleneck error');

      // Set up a mock that will reject with our error
      const mockSchedule = vi.fn().mockRejectedValue(error);
      mockBottleneck.mockImplementation(() => ({
        schedule: mockSchedule
      }));

      const testFn = async () => 'this should never be returned';

      await expect(scheduleWithRateLimit(testFn)).rejects.toThrow(error);
    });
  });
});
