/**
 * Rate limiting utilities for controlling request frequency
 */
import Bottleneck from 'bottleneck';

/**
 * Default rate limit in requests per second
 * @type {number}
 * @private
 */
const DEFAULT_RATE_LIMIT = 5;

/**
 * Map for storing rate limiters by limit value
 * @type {Map<number, Bottleneck>}
 * @private
 */
const limiters = new Map<number, Bottleneck>();

/**
 * Gets a rate limiter for the specified limit
 *
 * @param {number} [limit=DEFAULT_RATE_LIMIT] - Rate limit in requests per second
 * @returns {Bottleneck} A limiter instance configured for the specified rate limit
 */
export function getLimiter(limit?: number): Bottleneck {
  const rateLimit = limit || DEFAULT_RATE_LIMIT;

  if (!limiters.has(rateLimit)) {
    // Create a new limiter with the specified rate limit
    const limiter = new Bottleneck({
      maxConcurrent: rateLimit,
      minTime: 1000 / rateLimit
    });
    limiters.set(rateLimit, limiter);
  }

  return limiters.get(rateLimit) as Bottleneck;
}

/**
 * Schedules an async function to be executed with rate limiting
 *
 * @param {function(): Promise<T>} fn - Async function to execute
 * @param {number} [limit=DEFAULT_RATE_LIMIT] - Rate limit in requests per second
 * @returns {Promise<T>} Promise that resolves with the result of the function
 * @template T - The return type of the async function
 */
export async function scheduleWithRateLimit<T>(fn: () => Promise<T>, limit?: number): Promise<T> {
  const limiter = getLimiter(limit);
  return limiter.schedule(fn);
}
