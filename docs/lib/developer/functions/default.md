[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/developer](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`App`](../../../app-types/interfaces/App.md)[]\>

Defined in: [lib/developer.ts:67](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/developer.ts#L67)

Fetches information about a developer and their apps

## Parameters

### opts

[`DeveloperOptions`](../interfaces/DeveloperOptions.md)

The options object for developer lookup

## Returns

`Promise`\<[`App`](../../../app-types/interfaces/App.md)[]\>

Promise resolving to an array of the developer's apps

## Throws

If devId is not provided or developer is not found
