[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/common](../README.md) / getLimiter

# Function: getLimiter()

> **getLimiter**(`limit`?): `Bottleneck`

Defined in: [lib/utils/rate-limiter.ts:26](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/utils/rate-limiter.ts#L26)

Gets a rate limiter for the specified limit

## Parameters

### limit?

`number`

Rate limit in requests per second

## Returns

`Bottleneck`

A limiter instance configured for the specified rate limit
