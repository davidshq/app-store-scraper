[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/error-utils](../README.md) / handleRequestError

# Function: handleRequestError()

> **handleRequestError**(`error`, `context`?): `never`

Defined in: [lib/error-utils.ts:63](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-utils.ts#L63)

Handles errors from HTTP requests

## Parameters

### error

`Error`

The error that occurred

### context?

`string`

Additional context about where the error occurred

## Returns

`never`

Never returns, always throws an AppStoreScraperError

## Throws

AppStoreScraperError with appropriate details
