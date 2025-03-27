[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/param-types](../README.md) / normalizeAppIdentifier

# Function: normalizeAppIdentifier()

> **normalizeAppIdentifier**(`opts`): [`NormalizedAppIdentifier`](../interfaces/NormalizedAppIdentifier.md)

Defined in: [lib/param-types.ts:64](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/param-types.ts#L64)

Normalizes app identifier options to a standard format

## Parameters

### opts

[`AppIdentifierOptions`](../interfaces/AppIdentifierOptions.md)

Options containing either id or appId

## Returns

[`NormalizedAppIdentifier`](../interfaces/NormalizedAppIdentifier.md)

Normalized identifier object with idField and idValue

## Throws

Error if neither id nor appId is provided
