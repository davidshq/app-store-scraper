[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/error-types](../README.md) / errors

# Variable: errors

> `const` **errors**: `object`

Defined in: [lib/error-types.ts:276](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L276)

Error helper functions for creating specific error types

## Type declaration

### app()

> **app**: (`message`, `code`, `originalError`?, `params`?) => [`AppLookupError`](../classes/AppLookupError.md)

Creates an app lookup error

#### Parameters

##### message

`string` = `'App lookup failed'`

Error message

##### code

[`ErrorCode`](../enumerations/ErrorCode.md) = `ErrorCode.APP_NOT_FOUND`

Specific error code

##### originalError?

`Error`

The original error

##### params?

`Record`\<`string`, `any`\>

Parameters used in the API call

#### Returns

[`AppLookupError`](../classes/AppLookupError.md)

An app lookup error

### developer()

> **developer**: (`message`, `code`, `originalError`?, `params`?) => [`DeveloperError`](../classes/DeveloperError.md)

Creates a developer lookup error

#### Parameters

##### message

`string` = `'Developer lookup failed'`

Error message

##### code

[`ErrorCode`](../enumerations/ErrorCode.md) = `ErrorCode.DEVELOPER_NOT_FOUND`

Specific error code

##### originalError?

`Error`

The original error

##### params?

`Record`\<`string`, `any`\>

Parameters used in the API call

#### Returns

[`DeveloperError`](../classes/DeveloperError.md)

A developer lookup error

### fromHttpError()

> **fromHttpError**: (`error`, `endpoint`?) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Maps an HTTP error to a standardized error

#### Parameters

##### error

`Error`

Original HTTP error

##### endpoint?

`string`

The endpoint where the error occurred

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

> **notFound**: (`message`, `endpoint`?) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a not found error

#### Parameters

##### message

`string` = `'Resource not found'`

Error message

##### endpoint?

`string`

The endpoint where the resource was not found

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

### ratings()

> **ratings**: (`message`, `code`, `originalError`?, `params`?) => [`RatingsError`](../classes/RatingsError.md)

Creates a ratings error

#### Parameters

##### message

`string` = `'Ratings lookup failed'`

Error message

##### code

[`ErrorCode`](../enumerations/ErrorCode.md) = `ErrorCode.RATINGS_UNAVAILABLE`

Specific error code

##### originalError?

`Error`

The original error

##### params?

`Record`\<`string`, `any`\>

Parameters used in the API call

#### Returns

[`RatingsError`](../classes/RatingsError.md)

A ratings error

### reviews()

> **reviews**: (`message`, `code`, `originalError`?, `params`?) => [`ReviewsError`](../classes/ReviewsError.md)

Creates a reviews error

#### Parameters

##### message

`string` = `'Reviews lookup failed'`

Error message

##### code

[`ErrorCode`](../enumerations/ErrorCode.md) = `ErrorCode.REVIEW_NOT_FOUND`

Specific error code

##### originalError?

`Error`

The original error

##### params?

`Record`\<`string`, `any`\>

Parameters used in the API call

#### Returns

[`ReviewsError`](../classes/ReviewsError.md)

A reviews error

### search()

> **search**: (`message`, `code`, `originalError`?, `params`?) => [`SearchError`](../classes/SearchError.md)

Creates a search error

#### Parameters

##### message

`string` = `'Search failed'`

Error message

##### code

[`ErrorCode`](../enumerations/ErrorCode.md) = `ErrorCode.SEARCH_FAILED`

Specific error code

##### originalError?

`Error`

The original error

##### params?

`Record`\<`string`, `any`\>

Parameters used in the API call

#### Returns

[`SearchError`](../classes/SearchError.md)

A search error

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

> **validation**: (`message`, `params`?) => [`AppStoreScraperError`](../classes/AppStoreScraperError.md)

Creates a validation error

#### Parameters

##### message

`string` = `'Invalid parameter provided'`

Error message

##### params?

`Record`\<`string`, `any`\>

Parameters that caused the validation error

#### Returns

[`AppStoreScraperError`](../classes/AppStoreScraperError.md)

A validation error
