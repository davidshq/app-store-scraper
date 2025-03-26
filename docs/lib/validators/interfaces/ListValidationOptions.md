[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / ListValidationOptions

# Interface: ListValidationOptions

Defined in: [lib/validators.ts:201](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/validators.ts#L201)

List options interface

## Extends

- [`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md)

## Properties

### category?

> `optional` **category**: `number`

Defined in: [lib/validators.ts:202](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/validators.ts#L202)

***

### collection?

> `optional` **collection**: `string`

Defined in: [lib/validators.ts:203](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/validators.ts#L203)

***

### country?

> `optional` **country**: `string`

Defined in: [lib/param-types.ts:11](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L11)

The country code for the App Store (ISO 3166-1 alpha-2)

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`country`](../../param-types/interfaces/BaseRequestOptions.md#country)

***

### lang?

> `optional` **lang**: `string`

Defined in: [lib/param-types.ts:13](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L13)

The language code for localized data (e.g., 'en-us')

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`lang`](../../param-types/interfaces/BaseRequestOptions.md#lang)

***

### num?

> `optional` **num**: `number`

Defined in: [lib/validators.ts:204](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/validators.ts#L204)

***

### requestOptions?

> `optional` **requestOptions**: [`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Defined in: [lib/param-types.ts:17](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L17)

Additional options passed to the network request function

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`requestOptions`](../../param-types/interfaces/BaseRequestOptions.md#requestoptions)

***

### throttle?

> `optional` **throttle**: `number`

Defined in: [lib/param-types.ts:15](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L15)

Maximum number of requests per second

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`throttle`](../../param-types/interfaces/BaseRequestOptions.md#throttle)
