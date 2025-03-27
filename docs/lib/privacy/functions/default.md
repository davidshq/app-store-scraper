[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/privacy](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`PrivacyDetails`](../interfaces/PrivacyDetails.md)\>

Defined in: [lib/privacy.ts:65](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/privacy.ts#L65)

Fetches privacy information for an app

## Parameters

### opts

[`PrivacyOptions`](../interfaces/PrivacyOptions.md)

The options object

## Returns

`Promise`\<[`PrivacyDetails`](../interfaces/PrivacyDetails.md)\>

Promise resolving to app privacy details

## Throws

If id is not provided or app is not found
