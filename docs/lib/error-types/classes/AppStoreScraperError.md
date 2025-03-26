[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/error-types](../README.md) / AppStoreScraperError

# Class: AppStoreScraperError

Defined in: [lib/error-types.ts:21](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/error-types.ts#L21)

Custom error class for app-store-scraper errors

## Extends

- `Error`

## Constructors

### Constructor

> **new AppStoreScraperError**(`message`, `code`, `originalError`?): `AppStoreScraperError`

Defined in: [lib/error-types.ts:44](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/error-types.ts#L44)

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

#### Returns

`AppStoreScraperError`

#### Overrides

`Error.constructor`

## Properties

### code

> **code**: [`ErrorCode`](../enumerations/ErrorCode.md)

Defined in: [lib/error-types.ts:25](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/error-types.ts#L25)

Error code from ErrorCode enum

***

### originalError?

> `optional` **originalError**: `Error`

Defined in: [lib/error-types.ts:30](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/error-types.ts#L30)

Original error that caused this error (if any)

***

### statusCode?

> `optional` **statusCode**: `number`

Defined in: [lib/error-types.ts:35](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/error-types.ts#L35)

HTTP status code (if applicable)
