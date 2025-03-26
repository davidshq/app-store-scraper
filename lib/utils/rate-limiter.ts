/**
 * Rate limiting utilities for controlling request frequency
 */
import { RateLimiter } from 'limiter';

/**
 * Default rate limit in requests per second
 * @type {number}
 * @private
 */
const DEFAULT_RATE_LIMIT = 5;

/**
 * Map for storing rate limiters by limit value
 * @type {Map<number, RateLimiter>}
 * @private
 */
const limiters = new Map<number, RateLimiter>();

/**
 * Gets a rate limiter for the specified limit
 *
 * @param {number} [limit=DEFAULT_RATE_LIMIT] - Rate limit in requests per second
 * @returns {RateLimiter} A limiter instance configured for the specified rate limit
 */
export function getLimiter(limit?: number): RateLimiter {
  const rateLimit = limit || DEFAULT_RATE_LIMIT;

  if (!limiters.has(rateLimit)) {
    // Create a new limiter with the specified rate limit
    const limiter = new RateLimiter({
      tokensPerInterval: rateLimit,
      interval: 1000 // 1 second in milliseconds
    });
    limiters.set(rateLimit, limiter);
  }

  return limiters.get(rateLimit) as RateLimiter;
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

  // Wait until a token is available
  await limiter.removeTokens(1);

  // Execute the function once we have a token
  return fn();
}
