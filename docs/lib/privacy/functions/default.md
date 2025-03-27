[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/privacy](../README.md) / default

# Function: default()

> **default**(`opts`): `Promise`\<[`PrivacyDetails`](../interfaces/PrivacyDetails.md)\>

Defined in: [lib/privacy.ts:65](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/privacy.ts#L65)

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
