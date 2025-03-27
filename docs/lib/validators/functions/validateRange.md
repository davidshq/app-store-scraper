[**App Store Scraper API v0.18.0**](../../../README.md)

***

[App Store Scraper API](../../../modules.md) / [lib/validators](../README.md) / validateRange

# Function: validateRange()

> **validateRange**(`opts`, `field`, `min`, `max`, `message`?): `void`

Defined in: [lib/validators.ts:143](https://github.com/facundoolano/app-store-scraper/blob/7e1baf8350e9d5936df88e03bdbb2e2ecea26d48/lib/validators.ts#L143)

Validates a field is within a numeric range

## Parameters

### opts

[`GenericOptions`](../interfaces/GenericOptions.md)

Options to validate

### field

`string`

Field name to validate

### min

`number`

Minimum valid value (inclusive)

### max

`number`

Maximum valid value (inclusive)

### message?

`string`

Optional custom error message

## Returns

`void`

## Throws

If the field value is outside the range
