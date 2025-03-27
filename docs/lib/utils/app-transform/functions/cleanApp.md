[**App Store Scraper API v0.18.0**](../../../../README.md)

***

[App Store Scraper API](../../../../modules.md) / [lib/utils/app-transform](../README.md) / cleanApp

# Function: cleanApp()

> **cleanApp**(`app`): [`App`](../../../../app-types/interfaces/App.md)

Defined in: [lib/utils/app-transform.ts:19](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/utils/app-transform.ts#L19)

Normalizes and cleans app data returned from the iTunes API

This function transforms raw API response data into the standardized App format
used throughout the library. It handles field mapping, renames fields for clarity,
and computes derived properties.

## Parameters

### app

[`RawAppData`](../../../../app-types/interfaces/RawAppData.md)

Raw app data from iTunes API

## Returns

[`App`](../../../../app-types/interfaces/App.md)

Cleaned and normalized app data with consistent structure

## Example

```ts
const rawData = await itunesApiCall();
const cleanedApp = cleanApp(rawData.results[0]);
```
