[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/error-types](../README.md) / AppStoreScraperError

# Class: AppStoreScraperError

Defined in: [lib/error-types.ts:77](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L77)

Custom error class for app-store-scraper errors

## Extends

- `Error`

## Extended by

- [`AppLookupError`](AppLookupError.md)
- [`DeveloperError`](DeveloperError.md)
- [`RatingsError`](RatingsError.md)
- [`ReviewsError`](ReviewsError.md)
- [`SearchError`](SearchError.md)

## Implements

- [`IAppStoreScraperError`](../interfaces/IAppStoreScraperError.md)

## Constructors

### Constructor

> **new AppStoreScraperError**(`message`, `code`, `originalError`?, `endpoint`?, `params`?): `AppStoreScraperError`

Defined in: [lib/error-types.ts:112](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L112)

Creates a new AppStoreScraperError

#### Parameters

##### message

`string`

Error message

##### code

[`ErrorCode`](../enumerations/ErrorCode.md)

Error code from ErrorCode enum

##### originalError?

`Error`

The original error object (optional)

##### endpoint?

`string`

The API endpoint involved (optional)

##### params?

`Record`\<`string`, `any`\>

Parameters used in the API call (optional)

#### Returns

`AppStoreScraperError`

#### Overrides

`Error.constructor`

## Properties

### code

> **code**: [`ErrorCode`](../enumerations/ErrorCode.md)

Defined in: [lib/error-types.ts:81](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L81)

Error code from ErrorCode enum

#### Implementation of

[`IAppStoreScraperError`](../interfaces/IAppStoreScraperError.md).[`code`](../interfaces/IAppStoreScraperError.md#code)

***

### endpoint?

> `optional` **endpoint**: `string`

Defined in: [lib/error-types.ts:96](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L96)

API endpoint that caused the error (if applicable)

#### Implementation of

[`IAppStoreScraperError`](../interfaces/IAppStoreScraperError.md).[`endpoint`](../interfaces/IAppStoreScraperError.md#endpoint)

***

### originalError?

> `optional` **originalError**: `Error`

Defined in: [lib/error-types.ts:86](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L86)

Original error that caused this error (if any)

#### Implementation of

[`IAppStoreScraperError`](../interfaces/IAppStoreScraperError.md).[`originalError`](../interfaces/IAppStoreScraperError.md#originalerror)

***

### params?

> `optional` **params**: `Record`\<`string`, `any`\>

Defined in: [lib/error-types.ts:101](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L101)

Parameters used in the API call (if applicable)

#### Implementation of

[`IAppStoreScraperError`](../interfaces/IAppStoreScraperError.md).[`params`](../interfaces/IAppStoreScraperError.md#params)

***

### statusCode?

> `optional` **statusCode**: `number`

Defined in: [lib/error-types.ts:91](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L91)

HTTP status code (if applicable)

#### Implementation of

[`IAppStoreScraperError`](../interfaces/IAppStoreScraperError.md).[`statusCode`](../interfaces/IAppStoreScraperError.md#statuscode)

## Methods

### isCategory()

> **isCategory**(`category`): `boolean`

Defined in: [lib/error-types.ts:155](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L155)

Gets whether this error belongs to a specific category

#### Parameters

##### category

[`ErrorCode`](../enumerations/ErrorCode.md)

The category to check against

#### Returns

`boolean`

True if the error is in the specified category

***

### isRecoverable()

> **isRecoverable**(): `boolean`

Defined in: [lib/error-types.ts:163](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L163)

Indicates if this error is recoverable

#### Returns

`boolean`

True if the error might be recoverable (e.g., retrying)

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `any`\>

Defined in: [lib/error-types.ts:176](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L176)

Returns a plain object representation of the error

#### Returns

`Record`\<`string`, `any`\>

Plain object with error details
