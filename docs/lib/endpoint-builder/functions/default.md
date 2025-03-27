[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/endpoint-builder](../README.md) / default

# Function: default()

> **default**\<`T`, `R`\>(`config`, `dependencies`?): (`opts`?) => `Promise`\<`R`\>

Defined in: [lib/endpoint-builder.ts:57](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/endpoint-builder.ts#L57)

Creates a standardized endpoint function with consistent error handling and request patterns

## Type Parameters

### T

`T` *extends* `object`

### R

`R`

## Parameters

### config

[`EndpointConfig`](../interfaces/EndpointConfig.md)\<`T`, `R`\>

Configuration for the endpoint

### dependencies?

[`EndpointDependencies`](../interfaces/EndpointDependencies.md) = `{}`

Optional dependencies for testing

## Returns

`Function`

A standardized endpoint function

### Parameters

#### opts?

`T`

### Returns

`Promise`\<`R`\>
