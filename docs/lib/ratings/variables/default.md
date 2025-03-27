[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/ratings](../README.md) / default

# Variable: default()

> `const` **default**: (`opts`?) => `Promise`\<[`RatingsData`](../interfaces/RatingsData.md)\>

Defined in: [lib/ratings.ts:137](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/ratings.ts#L137)

Fetches ratings data for an app

## Parameters

### opts?

[`RatingsOptions`](../interfaces/RatingsOptions.md)

The options object

## Returns

`Promise`\<[`RatingsData`](../interfaces/RatingsData.md)\>

Promise resolving to app ratings data

## Throws

If id is not provided or app is not found
