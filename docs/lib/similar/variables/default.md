[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/similar](../README.md) / default

# Variable: default()

> `const` **default**: (`opts`?) => `Promise`\<[`App`](../../../app-types/interfaces/App.md)[]\>

Defined in: [lib/similar.ts:97](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/similar.ts#L97)

Fetches a list of similar apps for a given app

## Parameters

### opts?

[`SimilarOptions`](../interfaces/SimilarOptions.md)

The options object

## Returns

`Promise`\<[`App`](../../../app-types/interfaces/App.md)[]\>

Promise resolving to an array of similar apps

## Throws

If neither id nor appId is provided
