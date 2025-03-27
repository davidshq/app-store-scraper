[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/developer](../README.md) / DeveloperOptions

# Interface: DeveloperOptions

Defined in: [lib/developer.ts:12](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L12)

Options for developer data lookup
 DeveloperOptions

## Extends

- [`ApiRequestOptions`](../../param-utils/interfaces/ApiRequestOptions.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### country?

> `optional` **country**: `string`

Defined in: [lib/developer.ts:23](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L23)

The two-letter country code to get data from

#### Default

```ts
'us'
```

#### Overrides

[`ApiRequestOptions`](../../param-utils/interfaces/ApiRequestOptions.md).[`country`](../../param-utils/interfaces/ApiRequestOptions.md#country)

***

### devId

> **devId**: `string` \| `number`

Defined in: [lib/developer.ts:17](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L17)

The developer/artist ID to look up

***

### fullDetail?

> `optional` **fullDetail**: `boolean`

Defined in: [lib/developer.ts:50](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L50)

Whether to fetch full app details

#### Default

```ts
false
```

***

### lang?

> `optional` **lang**: `string`

Defined in: [lib/developer.ts:28](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L28)

The language code for localized data

#### Overrides

[`ApiRequestOptions`](../../param-utils/interfaces/ApiRequestOptions.md).[`lang`](../../param-utils/interfaces/ApiRequestOptions.md#lang)

***

### num?

> `optional` **num**: `number`

Defined in: [lib/developer.ts:44](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L44)

Number of results to return

#### Default

```ts
50
```

***

### requestOptions?

> `optional` **requestOptions**: [`RequestOptions`](../../utils/http-client/interfaces/RequestOptions.md)

Defined in: [lib/developer.ts:33](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L33)

Options for the underlying HTTP request

***

### throttle?

> `optional` **throttle**: `number`

Defined in: [lib/developer.ts:38](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/developer.ts#L38)

Rate limit for requests in requests per second
