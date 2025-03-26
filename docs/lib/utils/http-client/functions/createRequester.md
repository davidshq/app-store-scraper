[**App Store Scraper API v0.18.0**](../../../../README.md)

***

[App Store Scraper API](../../../../modules.md) / [lib/utils/http-client](../README.md) / createRequester

# Function: createRequester()

> **createRequester**(`httpClient`?, `limiterFactory`?): (`url`, `headers`?, `requestOptions`?, `limit`?) => `Promise`\<`string`\>

Defined in: [lib/utils/http-client.ts:67](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/utils/http-client.ts#L67)

Factory function that creates a request function with configurable dependencies
This makes testing easier by allowing dependency injection

## Parameters

### httpClient?

`Got`\<`ExtendOptions`\> = `got`

HTTP client used to make requests

### limiterFactory?

(`limit`?) => `Bottleneck`

Factory function for rate limiters

## Returns

`Function`

A request function that uses the provided dependencies

### Parameters

#### url

`string`

#### headers?

`Record`\<`string`, `string`\>

#### requestOptions?

[`RequestOptions`](../interfaces/RequestOptions.md)

#### limit?

`number`

### Returns

`Promise`\<`string`\>
