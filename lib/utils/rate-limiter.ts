/**
 * Rate limiting utilities to prevent API request throttling
 */
import Bottleneck from 'bottleneck';

/**
 * Default global rate limiter instance
 * @type {Bottleneck}
 * @private
 */
const defaultLimiter = new Bottleneck({
  maxConcurrent: 5, // Default concurrency limit
  minTime: 200 // Minimum time between requests (ms)
});

/**
 * Gets a rate limiter with the specified configuration
 * @param {number} [limit] - Maximum number of requests per second
 * @returns {Bottleneck} A configured rate limiter instance
 */
export function getLimiter(limit?: number): Bottleneck {
  if (!limit) return defaultLimiter;

  return new Bottleneck({
    maxConcurrent: limit,
    minTime: 1000 / limit // Distribute requests evenly across a second
  });
}

/**
 * Schedules a function to be executed with rate limiting
 * @param {Function} fn - The function to execute
 * @param {number} [limit] - Maximum number of requests per second
 * @returns {Promise<T>} Promise resolving to the function's result
 */
export async function scheduleWithRateLimit<T>(fn: () => Promise<T>, limit?: number): Promise<T> {
  const limiter = getLimiter(limit);
  return limiter.schedule(fn);
}
