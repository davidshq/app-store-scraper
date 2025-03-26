[**App Store Scraper API v0.18.0**](../../README.md)

***

[App Store Scraper API](../../modules.md) / [app-types](../README.md) / App

# Interface: App

Defined in: [lib/types/app-types.ts:91](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L91)

Interface for cleaned and normalized app data
 App

## Description

Standardized app data format used throughout the library

## Properties

### appId

> **appId**: `string`

Defined in: [lib/types/app-types.ts:95](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L95)

App bundle identifier (e.g., 'com.example.app')

***

### appletvScreenshots

> **appletvScreenshots**: `string`[]

Defined in: [lib/types/app-types.ts:155](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L155)

URLs to Apple TV screenshots

***

### contentRating

> **contentRating**: `string`

Defined in: [lib/types/app-types.ts:113](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L113)

Age rating (e.g., '4+', '12+', '17+')

***

### currency

> **currency**: `string`

Defined in: [lib/types/app-types.ts:131](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L131)

Currency code for the price

***

### currentVersionReviews?

> `optional` **currentVersionReviews**: `number`

Defined in: [lib/types/app-types.ts:149](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L149)

Number of user ratings for the current version

***

### currentVersionScore?

> `optional` **currentVersionScore**: `number`

Defined in: [lib/types/app-types.ts:147](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L147)

Average user rating for the current version (0-5)

***

### description

> **description**: `string`

Defined in: [lib/types/app-types.ts:101](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L101)

Full app description

***

### developer

> **developer**: `string`

Defined in: [lib/types/app-types.ts:137](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L137)

Developer name

***

### developerId

> **developerId**: `number`

Defined in: [lib/types/app-types.ts:135](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L135)

Developer ID

***

### developerUrl

> **developerUrl**: `string`

Defined in: [lib/types/app-types.ts:139](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L139)

URL to the developer's page on the App Store

***

### developerWebsite?

> `optional` **developerWebsite**: `string`

Defined in: [lib/types/app-types.ts:141](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L141)

URL to the developer's website (if available)

***

### free

> **free**: `boolean`

Defined in: [lib/types/app-types.ts:133](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L133)

Whether the app is free

***

### genreIds

> **genreIds**: `string`[]

Defined in: [lib/types/app-types.ts:107](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L107)

List of genre/category IDs

***

### genres

> **genres**: `string`[]

Defined in: [lib/types/app-types.ts:105](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L105)

List of app genres/categories

***

### histogram?

> `optional` **histogram**: `object`

Defined in: [lib/types/app-types.ts:161](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L161)

Distribution of ratings by star count (1-5)

#### Index Signature

\[`key`: `string`\]: `number`

***

### icon

> **icon**: `string`

Defined in: [lib/types/app-types.ts:103](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L103)

URL to the app's icon (highest available resolution)

***

### id

> **id**: `number`

Defined in: [lib/types/app-types.ts:93](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L93)

iTunes app ID (numeric)

***

### ipadScreenshots

> **ipadScreenshots**: `string`[]

Defined in: [lib/types/app-types.ts:153](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L153)

URLs to iPad screenshots

***

### languages

> **languages**: `string`[]

Defined in: [lib/types/app-types.ts:115](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L115)

ISO 2-letter language codes supported by the app

***

### price

> **price**: `number`

Defined in: [lib/types/app-types.ts:129](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L129)

App price in local currency (0 for free apps)

***

### primaryGenre

> **primaryGenre**: `string`

Defined in: [lib/types/app-types.ts:109](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L109)

Primary genre/category name

***

### primaryGenreId

> **primaryGenreId**: `number`

Defined in: [lib/types/app-types.ts:111](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L111)

Primary genre/category ID

***

### ratings?

> `optional` **ratings**: `number`

Defined in: [lib/types/app-types.ts:159](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L159)

Total number of ratings (may be available from ratings endpoint)

***

### released

> **released**: `string`

Defined in: [lib/types/app-types.ts:121](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L121)

Initial release date (ISO format)

***

### releaseNotes?

> `optional` **releaseNotes**: `string`

Defined in: [lib/types/app-types.ts:125](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L125)

Notes for the current version update

***

### requiredOsVersion

> **requiredOsVersion**: `string`

Defined in: [lib/types/app-types.ts:119](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L119)

Minimum iOS version required

***

### reviews

> **reviews**: `number`

Defined in: [lib/types/app-types.ts:145](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L145)

Number of user ratings

***

### score

> **score**: `number`

Defined in: [lib/types/app-types.ts:143](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L143)

Average user rating (0-5)

***

### screenshots

> **screenshots**: `string`[]

Defined in: [lib/types/app-types.ts:151](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L151)

URLs to iPhone screenshots

***

### size

> **size**: `string`

Defined in: [lib/types/app-types.ts:117](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L117)

App size (formatted)

***

### supportedDevices

> **supportedDevices**: `string`[]

Defined in: [lib/types/app-types.ts:157](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L157)

List of device models compatible with the app

***

### title

> **title**: `string`

Defined in: [lib/types/app-types.ts:97](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L97)

App name/title

***

### updated

> **updated**: `string`

Defined in: [lib/types/app-types.ts:123](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L123)

Last update date (ISO format)

***

### url

> **url**: `string`

Defined in: [lib/types/app-types.ts:99](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L99)

URL to the app's page on the App Store

***

### version

> **version**: `string`

Defined in: [lib/types/app-types.ts:127](https://github.com/facundoolano/app-store-scraper/blob/113d925388ad33c5af9077ca637c241f2bf7e574/lib/types/app-types.ts#L127)

Current app version string
