[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/common](../README.md) / request

# Function: request()

> **request**(`url`, `headers`?, `requestOptions`?, `limit`?): `Promise`\<`string`\>

Defined in: [lib/utils/http-client.ts:131](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/utils/http-client.ts#L131)

Makes an HTTP request with rate limiting

## Parameters

### url

`string`

The URL to request

### headers?

`Record`\<`string`, `string`\>

HTTP headers for the request

### requestOptions?

[`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Additional request options

### limit?

`number`

Rate limit for requests (requests per second)

## Returns

`Promise`\<`string`\>

Promise resolving to the response body
