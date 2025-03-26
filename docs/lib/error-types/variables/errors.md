[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/error-types](../README.md) / errors

# Variable: errors

> `const` **errors**: `object`

Defined in: [lib/error-types.ts:72](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/error-types.ts#L72)

Error helper functions for creating specific error types

## Type declaration

### fromHttpError()

> **fromHttpError**: (`error`) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Maps an HTTP error to a standardized error

#### Parameters

##### error

`Error`

Original HTTP error

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A standardized error

### network()

> **network**: (`message`, `originalError`?) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a network error

#### Parameters

##### message

`string` = `'Network error occurred'`

Error message

##### originalError?

`Error`

The original error

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A network error

### notFound()

> **notFound**: (`message`) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a not found error

#### Parameters

##### message

`string` = `'Resource not found'`

Error message

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A not found error

### parsing()

> **parsing**: (`message`, `originalError`?) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a parsing error

#### Parameters

##### message

`string` = `'Error parsing response'`

Error message

##### originalError?

`Error`

The original error

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A parsing error

### rateLimit()

> **rateLimit**: (`message`, `originalError`?) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a rate limit error

#### Parameters

##### message

`string` = `'Rate limit exceeded'`

Error message

##### originalError?

`Error`

The original error

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A rate limit error

### server()

> **server**: (`message`, `originalError`?) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a server error

#### Parameters

##### message

`string` = `'Server error'`

Error message

##### originalError?

`Error`

The original error

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A server error

### validation()

> **validation**: (`message`) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a validation error

#### Parameters

##### message

`string` = `'Invalid parameter provided'`

Error message

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A validation error
