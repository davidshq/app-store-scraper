[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/version-history](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`VersionHistoryEntry`](../interfaces/VersionHistoryEntry.md)[]\>

Defined in: [lib/version-history.ts:47](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/version-history.ts#L47)

Fetches the version history for an app

## Parameters

### opts

[`VersionHistoryOptions`](../interfaces/VersionHistoryOptions.md)

The options object

## Returns

`Promise`\<[`VersionHistoryEntry`](../interfaces/VersionHistoryEntry.md)[]\>

Promise resolving to an array of version history entries

## Throws

If id is not provided or app is not found
