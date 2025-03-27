[**App Store Scraper API v0.18.0**](../../../../README.md)

***

[App Store Scraper API](../../../../modules.md) / [lib/utils/rate-limiter](../README.md) / scheduleWithRateLimit

# Function: scheduleWithRateLimit()

> **scheduleWithRateLimit**\<`T`\>(`fn`, `limit`?): `Promise`\<`T`\>

Defined in: [lib/utils/rate-limiter.ts:49](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/utils/rate-limiter.ts#L49)

Schedules an async function to be executed with rate limiting

## Type Parameters

### T

`T`

The return type of the async function

## Parameters

### fn

() => `Promise`\<`T`\>

Async function to execute

### limit?

`number`

Rate limit in requests per second

## Returns

`Promise`\<`T`\>

Promise that resolves with the result of the function
