[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / SearchValidationOptions

# Interface: SearchValidationOptions

Defined in: [lib/validators.ts:254](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L254)

Search options interface

## Extends

- [`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`PaginationOptions`](../../param-types/interfaces/PaginationOptions.md)

## Properties

### country?

> `optional` **country**: `string`

Defined in: [lib/param-types.ts:11](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L11)

The country code for the App Store (ISO 3166-1 alpha-2)

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`country`](../../param-types/interfaces/BaseRequestOptions.md#country)

***

### idsOnly?

> `optional` **idsOnly**: `boolean`

Defined in: [lib/validators.ts:256](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L256)

***

### lang?

> `optional` **lang**: `string`

Defined in: [lib/param-types.ts:13](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L13)

The language code for localized data (e.g., 'en-us')

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`lang`](../../param-types/interfaces/BaseRequestOptions.md#lang)

***

### num?

> `optional` **num**: `number`

Defined in: [lib/param-types.ts:25](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L25)

Number of results to retrieve (per page)

#### Inherited from

[`PaginationOptions`](../../param-types/interfaces/PaginationOptions.md).[`num`](../../param-types/interfaces/PaginationOptions.md#num)

***

### page?

> `optional` **page**: `number`

Defined in: [lib/param-types.ts:27](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L27)

Page number to retrieve (starting from 1)

#### Inherited from

[`PaginationOptions`](../../param-types/interfaces/PaginationOptions.md).[`page`](../../param-types/interfaces/PaginationOptions.md#page)

***

### requestOptions?

> `optional` **requestOptions**: [`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Defined in: [lib/param-types.ts:17](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L17)

Additional options passed to the network request function

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`requestOptions`](../../param-types/interfaces/BaseRequestOptions.md#requestoptions)

***

### term?

> `optional` **term**: `string`

Defined in: [lib/validators.ts:255](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L255)

***

### throttle?

> `optional` **throttle**: `number`

Defined in: [lib/param-types.ts:15](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/param-types.ts#L15)

Maximum number of requests per second

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`throttle`](../../param-types/interfaces/BaseRequestOptions.md#throttle)
