[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/search](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`App`](../../../app-types/interfaces/App.md)[] \| `number`[]\>

Defined in: [lib/search.ts:84](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/search.ts#L84)

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
