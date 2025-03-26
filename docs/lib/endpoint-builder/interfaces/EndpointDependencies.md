[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/endpoint-builder](../README.md) / EndpointDependencies

# Interface: EndpointDependencies

Defined in: [lib/endpoint-builder.ts:38](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L38)

Interface for endpoint dependencies

## Properties

### appFunction()?

> `optional` **appFunction**: (`opts`) => `Promise`\<`any`\>

Defined in: [lib/endpoint-builder.ts:42](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L42)

App function to use (defaults to app import)

#### Parameters

##### opts

`any`

#### Returns

`Promise`\<`any`\>

***

### requestFunction()?

> `optional` **requestFunction**: (`url`, `headers`?, `requestOptions`?, `limit`?) => `Promise`\<`string`\>

Defined in: [lib/endpoint-builder.ts:47](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L47)

Request function to use (defaults to request)

Makes an HTTP request with rate limiting

#### Parameters

##### url

`string`

The URL to request

##### headers?

`Record`\<`string`, `string`\>

HTTP headers for the request

##### requestOptions?

[`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Additional request options

##### limit?

`number`

Rate limit for requests (requests per second)

#### Returns

`Promise`\<`string`\>

Promise resolving to the response body
