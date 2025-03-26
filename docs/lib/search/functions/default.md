[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/search](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`App`](../../../app-types/interfaces/App.md)[] \| `number`[]\>

Defined in: [lib/search.ts:84](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/search.ts#L84)

Searches for apps in the App Store

## Parameters

### opts

[`SearchOptions`](../interfaces/SearchOptions.md)

The options object for search

## Returns

`Promise`\<[`App`](../../../app-types/interfaces/App.md)[] \| `number`[]\>

Promise resolving to an array of apps or app IDs (if idsOnly is true)

## Throws

If term is not provided or search fails
