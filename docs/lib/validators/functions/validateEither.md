[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / validateEither

# Function: validateEither()

> **validateEither**(`opts`, `field1`, `field2`, `message`?): `void`

Defined in: [lib/validators.ts:82](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/validators.ts#L82)

Validates that either of two fields is present in options

## Parameters

### opts

[`GenericOptions`](../interfaces/GenericOptions.md)

Options to validate

### field1

`string`

First field name

### field2

`string`

Second field name

### message?

`string`

Optional custom error message

## Returns

`void`

## Throws

If both fields are missing
