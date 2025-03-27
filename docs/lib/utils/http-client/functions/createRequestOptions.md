[**App Store Scraper API v0.18.0**](../../../../README.md)

***

[App Store Scraper API](../../../../modules.md) / [lib/utils/http-client](../README.md) / createRequestOptions

# Function: createRequestOptions()

> **createRequestOptions**(`headers`?, `customOptions`?): [`RequestOptions`](../interfaces/RequestOptions.md)

Defined in: [lib/utils/http-client.ts:35](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/utils/http-client.ts#L35)

Creates request options by merging defaults with custom options

## Parameters

### headers?

`Record`\<`string`, `string`\>

HTTP headers to include in the request

### customOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)

Custom request options to merge with defaults

## Returns

[`RequestOptions`](../interfaces/RequestOptions.md)

The merged request options
