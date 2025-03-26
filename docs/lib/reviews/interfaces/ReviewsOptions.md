[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/reviews](../README.md) / ReviewsOptions

# Interface: ReviewsOptions

Defined in: [lib/reviews.ts:10](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/reviews.ts#L10)

Options for reviews lookup

## Extends

- [`AppIdentifierOptions`](../../param-types/interfaces/AppIdentifierOptions.md).[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).`Pick`\<[`PaginationOptions`](../../param-types/interfaces/PaginationOptions.md), `"page"`\>

## Properties

### appId?

> `optional` **appId**: `string`

Defined in: [lib/param-types.ts:37](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L37)

The app bundle ID (e.g., 'com.example.app')

#### Inherited from

[`AppIdentifierOptions`](../../param-types/interfaces/AppIdentifierOptions.md).[`appId`](../../param-types/interfaces/AppIdentifierOptions.md#appid)

***

### country?

> `optional` **country**: `string`

Defined in: [lib/param-types.ts:11](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L11)

The country code for the App Store (ISO 3166-1 alpha-2)

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`country`](../../param-types/interfaces/BaseRequestOptions.md#country)

***

### id?

> `optional` **id**: `string` \| `number`

Defined in: [lib/param-types.ts:35](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L35)

The iTunes app ID (numeric)

#### Inherited from

[`AppIdentifierOptions`](../../param-types/interfaces/AppIdentifierOptions.md).[`id`](../../param-types/interfaces/AppIdentifierOptions.md#id)

***

### lang?

> `optional` **lang**: `string`

Defined in: [lib/param-types.ts:13](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L13)

The language code for localized data (e.g., 'en-us')

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`lang`](../../param-types/interfaces/BaseRequestOptions.md#lang)

***

### page?

> `optional` **page**: `number`

Defined in: [lib/param-types.ts:27](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L27)

Page number to retrieve (starting from 1)

#### Inherited from

`Pick.page`

***

### requestOptions?

> `optional` **requestOptions**: [`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Defined in: [lib/param-types.ts:17](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L17)

Additional options passed to the network request function

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`requestOptions`](../../param-types/interfaces/BaseRequestOptions.md#requestoptions)

***

### sort?

> `optional` **sort**: `string`

Defined in: [lib/reviews.ts:15](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/reviews.ts#L15)

The sort order (see constants.sort)

***

### throttle?

> `optional` **throttle**: `number`

Defined in: [lib/param-types.ts:15](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/param-types.ts#L15)

Maximum number of requests per second

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`throttle`](../../param-types/interfaces/BaseRequestOptions.md#throttle)
