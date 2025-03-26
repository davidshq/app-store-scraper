[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/ratings](../README.md) / default

# Variable: default()

> `const` **default**: (`opts`?) => `Promise`\<[`RatingsData`](../interfaces/RatingsData.md)\>

Defined in: [lib/ratings.ts:137](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/ratings.ts#L137)

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
