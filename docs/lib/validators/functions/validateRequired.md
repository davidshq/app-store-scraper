[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / validateRequired

# Function: validateRequired()

> **validateRequired**(`opts`, `requiredFields`, `message`?): `void`

Defined in: [lib/validators.ts:57](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/validators.ts#L57)

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
