[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/list](../README.md) / default

# Function: default()

> **default**\<`T`\>(`opts`): `Promise`\<`T`\[`"fullDetail"`\] *extends* `true` ? [`App`](../../../app-types/interfaces/App.md)[] : [`ListApp`](../interfaces/ListApp.md)[]\>

Defined in: [lib/list.ts:198](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/list.ts#L198)

Fetches a list of apps from the App Store

## Type Parameters

### T

`T` *extends* [`ListOptions`](../interfaces/ListOptions.md) = [`ListOptions`](../interfaces/ListOptions.md)

Type extending ListOptions to handle fullDetail typing

## Parameters

### opts

`T` = `...`

The options object for list request

## Returns

`Promise`\<`T`\[`"fullDetail"`\] *extends* `true` ? [`App`](../../../app-types/interfaces/App.md)[] : [`ListApp`](../interfaces/ListApp.md)[]\>

Promise resolving to an array of apps (full details if fullDetail is true)

## Throws

If collection is not provided or list request fails
