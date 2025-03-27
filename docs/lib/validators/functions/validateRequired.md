[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / validateRequired

# Function: validateRequired()

> **validateRequired**(`opts`, `requiredFields`, `message`?): `void`

Defined in: [lib/validators.ts:57](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L57)

Validates that required fields are present in options

## Parameters

### opts

[`GenericOptions`](../interfaces/GenericOptions.md)

Options to validate

### requiredFields

`string`[]

Array of required field names

### message?

`string`

Optional custom error message

## Returns

`void`

## Throws

If any required field is missing
