[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/endpoint-builder](../README.md) / EndpointConfig

# Interface: EndpointConfig\<T, R\>

Defined in: [lib/endpoint-builder.ts:13](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L13)

Interface for endpoint configuration

## Type Parameters

### T

`T`

### R

`R`

## Properties

### fetch()

> **fetch**: (`opts`, `dependencies`?) => `Promise`\<`R`\>

Defined in: [lib/endpoint-builder.ts:17](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L17)

Function that performs the actual API request

#### Parameters

##### opts

`T`

##### dependencies?

###### requestFn?

(`url`, `headers`?, `requestOptions`?, `limit`?) => `Promise`\<`string`\>

#### Returns

`Promise`\<`R`\>

***

### resolveId?

> `optional` **resolveId**: `boolean`

Defined in: [lib/endpoint-builder.ts:32](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L32)

Whether to resolve id/appId to numeric id if needed

***

### transform()?

> `optional` **transform**: (`data`) => `R`

Defined in: [lib/endpoint-builder.ts:27](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L27)

Function to transform the response data

#### Parameters

##### data

`any`

#### Returns

`R`

***

### validate()?

> `optional` **validate**: (`opts`) => `void`

Defined in: [lib/endpoint-builder.ts:22](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/endpoint-builder.ts#L22)

Function to validate the options

#### Parameters

##### opts

`T`

#### Returns

`void`
