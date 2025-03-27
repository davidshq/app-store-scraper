[**App Store Scraper API v0.18.0**](../../README.md)

***

[App Store Scraper API](../../modules.md) / [index](../README.md) / CacheOptions

# Interface: CacheOptions

Defined in: [index.ts:54](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/index.ts#L54)

Interface for cache options

## Properties

### max?

> `optional` **max**: `number`

Defined in: [index.ts:62](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/index.ts#L62)

Maximum cache size to prevent memory issues

***

### maxAge?

> `optional` **maxAge**: `number`

Defined in: [index.ts:60](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/index.ts#L60)

Cache TTL in milliseconds

***

### normalizer()?

> `optional` **normalizer**: (`args`) => `string`

Defined in: [index.ts:58](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/index.ts#L58)

Function to create cache keys from arguments

#### Parameters

##### args

`any`[]

#### Returns

`string`

***

### primitive?

> `optional` **primitive**: `boolean`

Defined in: [index.ts:56](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/index.ts#L56)

Whether to consider arguments as primitives

***

### profileName?

> `optional` **profileName**: `string`

Defined in: [index.ts:66](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/index.ts#L66)

Name of cache profile for debugging

***

### promise?

> `optional` **promise**: `boolean`

Defined in: [index.ts:64](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/index.ts#L64)

Whether to cache promise rejections
