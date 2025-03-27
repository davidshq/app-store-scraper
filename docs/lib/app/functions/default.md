[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/app](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`App`](../../../app-types/interfaces/App.md)\>

Defined in: [lib/app.ts:35](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/app.ts#L35)

Fetches detailed information about an app from the App Store

## Parameters

### opts

[`AppOptions`](../interfaces/AppOptions.md)

The options object for app lookup

## Returns

`Promise`\<[`App`](../../../app-types/interfaces/App.md)\>

Promise resolving to the complete app information

## Throws

If neither id nor appId is provided or app is not found
