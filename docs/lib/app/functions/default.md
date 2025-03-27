[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/app](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`App`](../../../app-types/interfaces/App.md)\>

Defined in: [lib/app.ts:35](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/app.ts#L35)

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
