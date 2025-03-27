[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/error-types](../README.md) / ReviewsError

# Class: ReviewsError

Defined in: [lib/error-types.ts:244](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L244)

Error for reviews endpoint

## Extends

- [`AppStoreScraperError`](AppStoreScraperError.md)

## Constructors

### Constructor

> **new ReviewsError**(`message`, `code`, `originalError`?, `params`?): `ReviewsError`

Defined in: [lib/error-types.ts:245](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L245)

#### Parameters

##### message

`string`

##### code

[`ErrorCode`](../enumerations/ErrorCode.md) = `ErrorCode.REVIEW_NOT_FOUND`

##### originalError?

`Error`

##### params?

`Record`\<`string`, `any`\>

#### Returns

`ReviewsError`

#### Overrides

[`AppStoreScraperError`](AppStoreScraperError.md).[`constructor`](AppStoreScraperError.md#constructor)

## Properties

### code

> **code**: [`ErrorCode`](../enumerations/ErrorCode.md)

Defined in: [lib/error-types.ts:81](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L81)

Error code from ErrorCode enum

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`code`](AppStoreScraperError.md#code)

***

### endpoint?

> `optional` **endpoint**: `string`

Defined in: [lib/error-types.ts:96](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L96)

API endpoint that caused the error (if applicable)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`endpoint`](AppStoreScraperError.md#endpoint)

***

### originalError?

> `optional` **originalError**: `Error`

Defined in: [lib/error-types.ts:86](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L86)

Original error that caused this error (if any)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`originalError`](AppStoreScraperError.md#originalerror)

***

### params?

> `optional` **params**: `Record`\<`string`, `any`\>

Defined in: [lib/error-types.ts:101](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L101)

Parameters used in the API call (if applicable)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`params`](AppStoreScraperError.md#params)

***

### statusCode?

> `optional` **statusCode**: `number`

Defined in: [lib/error-types.ts:91](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L91)

HTTP status code (if applicable)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`statusCode`](AppStoreScraperError.md#statuscode)

## Methods

### isCategory()

> **isCategory**(`category`): `boolean`

Defined in: [lib/error-types.ts:155](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L155)

Gets whether this error belongs to a specific category

#### Parameters

##### category

[`ErrorCode`](../enumerations/ErrorCode.md)

The category to check against

#### Returns

`boolean`

True if the error is in the specified category

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`isCategory`](AppStoreScraperError.md#iscategory)

***

### isRecoverable()

> **isRecoverable**(): `boolean`

Defined in: [lib/error-types.ts:163](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L163)

Indicates if this error is recoverable

#### Returns

`boolean`

True if the error might be recoverable (e.g., retrying)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`isRecoverable`](AppStoreScraperError.md#isrecoverable)

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `any`\>

Defined in: [lib/error-types.ts:176](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/error-types.ts#L176)

Returns a plain object representation of the error

#### Returns

`Record`\<`string`, `any`\>

Plain object with error details

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`toJSON`](AppStoreScraperError.md#tojson)
