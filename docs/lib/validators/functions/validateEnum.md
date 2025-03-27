[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / validateEnum

# Function: validateEnum()

> **validateEnum**\<`T`\>(`opts`, `field`, `validValues`, `message`?): `void`

Defined in: [lib/validators.ts:107](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L107)

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
