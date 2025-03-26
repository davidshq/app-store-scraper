[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/common](../README.md) / request

# Function: request()

> **request**(`url`, `headers`?, `requestOptions`?, `limit`?): `Promise`\<`string`\>

Defined in: [lib/utils/http-client.ts:130](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/utils/http-client.ts#L130)

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
