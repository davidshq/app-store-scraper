[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/param-types](../README.md) / BaseRequestOptions

# Interface: BaseRequestOptions

Defined in: [lib/param-types.ts:9](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L9)

Base request options interface for all API methods

## Extended by

- [`AppOptions`](../../app/interfaces/AppOptions.md)
- [`ListOptions`](../../list/interfaces/ListOptions.md)
- [`RatingsOptions`](../../ratings/interfaces/RatingsOptions.md)
- [`ReviewsOptions`](../../reviews/interfaces/ReviewsOptions.md)
- [`SearchOptions`](../../search/interfaces/SearchOptions.md)
- [`SimilarOptions`](../../similar/interfaces/SimilarOptions.md)
- [`ListValidationOptions`](../../validators/interfaces/ListValidationOptions.md)
- [`ReviewsValidationOptions`](../../validators/interfaces/ReviewsValidationOptions.md)
- [`SearchValidationOptions`](../../validators/interfaces/SearchValidationOptions.md)
- [`DeveloperValidationOptions`](../../validators/interfaces/DeveloperValidationOptions.md)
- [`PrivacyValidationOptions`](../../validators/interfaces/PrivacyValidationOptions.md)
- [`VersionHistoryValidationOptions`](../../validators/interfaces/VersionHistoryValidationOptions.md)
- [`SuggestValidationOptions`](../../validators/interfaces/SuggestValidationOptions.md)

## Properties

### country?

> `optional` **country**: `string`

Defined in: [lib/param-types.ts:11](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L11)

The country code for the App Store (ISO 3166-1 alpha-2)

***

### lang?

> `optional` **lang**: `string`

Defined in: [lib/param-types.ts:13](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L13)

The language code for localized data (e.g., 'en-us')

***

### requestOptions?

> `optional` **requestOptions**: [`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Defined in: [lib/param-types.ts:17](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L17)

Additional options passed to the network request function

***

### throttle?

> `optional` **throttle**: `number`

Defined in: [lib/param-types.ts:15](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L15)

Maximum number of requests per second
