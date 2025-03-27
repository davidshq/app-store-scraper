[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/list](../README.md) / ListOptions

# Interface: ListOptions

Defined in: [lib/list.ts:13](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/list.ts#L13)

Options for list lookup
 ListOptions

## Extends

- [`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`DetailOptions`](../../param-types/interfaces/DetailOptions.md).`Pick`\<[`PaginationOptions`](../../param-types/interfaces/PaginationOptions.md), `"num"`\>

## Properties

### category?

> `optional` **category**: `number`

Defined in: [lib/list.ts:26](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/list.ts#L26)

The category to fetch apps from (numeric ID)

***

### collection?

> `optional` **collection**: `string`

Defined in: [lib/list.ts:21](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/list.ts#L21)

The collection to fetch (e.g., 'topfreeapplications', 'toppaidapplications')

***

### country?

> `optional` **country**: `string`

Defined in: [lib/param-types.ts:11](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L11)

The country code for the App Store (ISO 3166-1 alpha-2)

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`country`](../../param-types/interfaces/BaseRequestOptions.md#country)

***

### fullDetail?

> `optional` **fullDetail**: `boolean`

Defined in: [lib/param-types.ts:45](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L45)

Whether to fetch full app details

#### Inherited from

[`DetailOptions`](../../param-types/interfaces/DetailOptions.md).[`fullDetail`](../../param-types/interfaces/DetailOptions.md#fulldetail)

***

### lang?

> `optional` **lang**: `string`

Defined in: [lib/param-types.ts:13](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L13)

The language code for localized data (e.g., 'en-us')

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`lang`](../../param-types/interfaces/BaseRequestOptions.md#lang)

***

### num?

> `optional` **num**: `number`

Defined in: [lib/param-types.ts:25](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L25)

Number of results to retrieve (per page)

#### Inherited from

`Pick.num`

***

### requestOptions?

> `optional` **requestOptions**: [`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Defined in: [lib/param-types.ts:17](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L17)

Additional options passed to the network request function

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`requestOptions`](../../param-types/interfaces/BaseRequestOptions.md#requestoptions)

***

### throttle?

> `optional` **throttle**: `number`

Defined in: [lib/param-types.ts:15](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L15)

Maximum number of requests per second

#### Inherited from

[`BaseRequestOptions`](../../param-types/interfaces/BaseRequestOptions.md).[`throttle`](../../param-types/interfaces/BaseRequestOptions.md#throttle)
