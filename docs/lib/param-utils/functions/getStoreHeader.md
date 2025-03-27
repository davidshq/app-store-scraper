[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/param-utils](../README.md) / getStoreHeader

# Function: getStoreHeader()

> **getStoreHeader**(`opts`, `storeType`?): `Record`\<`string`, `string`\>

Defined in: [lib/param-utils.ts:63](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-utils.ts#L63)

Creates store header for request

## Parameters

### opts

[`ApiRequestOptions`](../interfaces/ApiRequestOptions.md)

Options object

### storeType?

`number` = `32`

Store type (varies by endpoint)

## Returns

`Record`\<`string`, `string`\>

Headers object with X-Apple-Store-Front
