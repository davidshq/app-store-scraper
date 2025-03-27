[**App Store Scraper API v0.18.0**](../../../../README.md)

***

[App Store Scraper API](../../../../modules.md) / [lib/utils/http-client](../README.md) / request

# Function: request()

> **request**(`url`, `headers`?, `requestOptions`?, `limit`?): `Promise`\<`string`\>

Defined in: [lib/utils/http-client.ts:131](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/utils/http-client.ts#L131)

Makes an HTTP request with rate limiting

## Parameters

### url

`string`

The URL to request

### headers?

`Record`\<`string`, `string`\>

HTTP headers for the request

### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)

Additional request options

### limit?

`number`

Rate limit for requests (requests per second)

## Returns

`Promise`\<`string`\>

Promise resolving to the response body
