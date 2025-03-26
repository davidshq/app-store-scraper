[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/app](../README.md) / AppOptions

# Interface: AppOptions

Defined in: [lib/app.ts:13](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/app.ts#L13)

Options for app lookup
 AppOptions

## Extends

- [`AppIdentifierOptions`](../../param-types/interfaces/AppIdentifierOptions.md).[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md)

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

### ratings?

> `optional` **ratings**: `boolean`

Defined in: [lib/app.ts:18](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/app.ts#L18)

Whether to include ratings data with the response

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
