[**App Store Scraper API v0.18.0**](../../README.md)

***

[App Store Scraper API](../../modules.md) / [index](../README.md) / Api

# Type Alias: Api

> **Api** = `ApiMethods` & *typeof* [`default`](../../lib/constants/variables/default.md) & `object`

Defined in: [index.ts:81](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/index.ts#L81)

Type for the complete API with all methods and constants

## Type declaration

### clearCache()

> **clearCache**: (`memoizedApi`, `methodName`?) => `void`

Clears the cache for a memoized API instance

#### Parameters

##### memoizedApi

[`ApiInstance`](ApiInstance.md)

##### methodName?

`string`

#### Returns

`void`

### configureCaching()

> **configureCaching**: (`methodConfigs`, `defaultOpts`?) => `Api`

Creates API with method-specific cache configurations

#### Parameters

##### methodConfigs

[`MethodCacheConfig`](../interfaces/MethodCacheConfig.md)

##### defaultOpts?

[`CacheOptions`](../interfaces/CacheOptions.md)

#### Returns

`Api`

### memoized()

> **memoized**: (`opts`?) => `Api`

Creates a memoized version of the API with configurable caching

#### Parameters

##### opts?

[`CacheOptions`](../interfaces/CacheOptions.md)

#### Returns

`Api`
