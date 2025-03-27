[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / validateEnum

# Function: validateEnum()

> **validateEnum**\<`T`\>(`opts`, `field`, `validValues`, `message`?): `void`

Defined in: [lib/validators.ts:107](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/validators.ts#L107)

Validates a field against an array of valid values

## Type Parameters

### T

`T`

## Parameters

### opts

[`GenericOptions`](../interfaces/GenericOptions.md)

Options to validate

### field

`string`

Field name to validate

### validValues

`T`[]

Array of valid values

### message?

`string`

Optional custom error message

## Returns

`void`

## Throws

If the field value is not valid
