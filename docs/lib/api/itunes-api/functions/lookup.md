[**App Store Scraper API v0.18.0**](../../../../README.md)

***

[App Store Scraper API](../../../../modules.md) / [lib/api/itunes-api](../README.md) / lookup

# Function: lookup()

> **lookup**(`ids`, `idField`?, `country`?, `lang`?, `requestOptions`?, `throttle`?): `Promise`\<[`App`](../../../../app-types/interfaces/App.md)[]\>

Defined in: [lib/api/itunes-api.ts:19](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/api/itunes-api.ts#L19)

Looks up app details in iTunes API by app ID(s)

## Parameters

### ids

(`string` \| `number`)[]

Array of app IDs to look up

### idField?

`string` = `'id'`

The field to use for ID lookup ('id' or 'bundleId')

### country?

`string` = `'us'`

Country code for the lookup

### lang?

`string`

Language code for localized data

### requestOptions?

[`RequestOptions`](../../../utils/http-client/interfaces/RequestOptions.md)

Additional request options

### throttle?

`number`

Rate limit for requests

## Returns

`Promise`\<[`App`](../../../../app-types/interfaces/App.md)[]\>

Promise resolving to array of app details
