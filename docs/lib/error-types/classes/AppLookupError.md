[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/error-types](../README.md) / AppLookupError

# Class: AppLookupError

Defined in: [lib/error-types.ts:196](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L196)

Error for app lookup endpoint

## Extends

- [`AppStoreScraperError`](AppStoreScraperError.md)

## Constructors

### Constructor

> **new AppLookupError**(`message`, `code`, `originalError`?, `params`?): `AppLookupError`

Defined in: [lib/error-types.ts:197](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L197)

#### Parameters

##### message

`string`

##### code

[`ErrorCode`](../enumerations/ErrorCode.md) = `ErrorCode.APP_NOT_FOUND`

##### originalError?

`Error`

##### params?

`Record`\<`string`, `any`\>

#### Returns

`AppLookupError`

#### Overrides

[`AppStoreScraperError`](AppStoreScraperError.md).[`constructor`](AppStoreScraperError.md#constructor)

## Properties

### code

> **code**: [`ErrorCode`](../enumerations/ErrorCode.md)

Defined in: [lib/error-types.ts:81](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L81)

Error code from ErrorCode enum

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`code`](AppStoreScraperError.md#code)

***

### endpoint?

> `optional` **endpoint**: `string`

Defined in: [lib/error-types.ts:96](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L96)

API endpoint that caused the error (if applicable)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`endpoint`](AppStoreScraperError.md#endpoint)

***

### originalError?

> `optional` **originalError**: `Error`

Defined in: [lib/error-types.ts:86](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L86)

Original error that caused this error (if any)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`originalError`](AppStoreScraperError.md#originalerror)

***

### params?

> `optional` **params**: `Record`\<`string`, `any`\>

Defined in: [lib/error-types.ts:101](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L101)

Parameters used in the API call (if applicable)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`params`](AppStoreScraperError.md#params)

***

### statusCode?

> `optional` **statusCode**: `number`

Defined in: [lib/error-types.ts:91](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L91)

HTTP status code (if applicable)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`statusCode`](AppStoreScraperError.md#statuscode)

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

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`isCategory`](AppStoreScraperError.md#iscategory)

***

### isRecoverable()

> **isRecoverable**(): `boolean`

Defined in: [lib/error-types.ts:163](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L163)

Indicates if this error is recoverable

#### Returns

`boolean`

True if the error might be recoverable (e.g., retrying)

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`isRecoverable`](AppStoreScraperError.md#isrecoverable)

***

### toJSON()

> **toJSON**(): `Record`\<`string`, `any`\>

Defined in: [lib/error-types.ts:176](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/error-types.ts#L176)

Returns a plain object representation of the error

#### Returns

`Record`\<`string`, `any`\>

Plain object with error details

#### Inherited from

[`AppStoreScraperError`](AppStoreScraperError.md).[`toJSON`](AppStoreScraperError.md#tojson)
