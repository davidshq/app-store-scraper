[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / PrivacyValidationOptions

# Interface: PrivacyValidationOptions

Defined in: [lib/validators.ts:291](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L291)

Privacy options interface

## Extends

- [`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md)

## Properties

### appId?

> `optional` **appId**: `string`

Defined in: [lib/validators.ts:293](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L293)

***

### country?

> `optional` **country**: `string`

Defined in: [lib/param-types.ts:11](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L11)

The country code for the App Store (ISO 3166-1 alpha-2)

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`country`](../../param-types/interfaces/BaseRequestOptions.md#country)

***

### id?

> `optional` **id**: `string` \| `number`

Defined in: [lib/validators.ts:292](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L292)

***

### lang?

> `optional` **lang**: `string`

Defined in: [lib/param-types.ts:13](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L13)

The language code for localized data (e.g., 'en-us')

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`lang`](../../param-types/interfaces/BaseRequestOptions.md#lang)

***

### requestOptions?

> `optional` **requestOptions**: [`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Defined in: [lib/param-types.ts:17](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L17)

Additional options passed to the network request function

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`requestOptions`](../../param-types/interfaces/BaseRequestOptions.md#requestoptions)

***

### throttle?

> `optional` **throttle**: `number`

Defined in: [lib/param-types.ts:15](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L15)

Maximum number of requests per second

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`throttle`](../../param-types/interfaces/BaseRequestOptions.md#throttle)
