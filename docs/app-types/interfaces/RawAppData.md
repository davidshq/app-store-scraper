[**App Store Scraper API v0.18.0**](../../README.md)

***

[App Store Scraper API](../../modules.md) / [app-types](../README.md) / RawAppData

# Interface: RawAppData

Defined in: [lib/types/app-types.ts:11](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L11)

Interface for raw app data from iTunes API
 RawAppData

## Description

Raw data structure returned by the iTunes API before normalization

## Indexable

\[`key`: `string`\]: `any`

## Properties

### appletvScreenshotUrls

> **appletvScreenshotUrls**: `string`[]

Defined in: [lib/types/app-types.ts:77](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L77)

URLs to Apple TV screenshots

***

### artistId

> **artistId**: `number`

Defined in: [lib/types/app-types.ts:57](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L57)

Developer/artist ID

***

### artistName

> **artistName**: `string`

Defined in: [lib/types/app-types.ts:59](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L59)

Developer/artist name

***

### artistViewUrl

> **artistViewUrl**: `string`

Defined in: [lib/types/app-types.ts:61](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L61)

URL to the developer's page on the App Store

***

### artworkUrl100?

> `optional` **artworkUrl100**: `string`

Defined in: [lib/types/app-types.ts:25](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L25)

URL to 100px app icon

***

### artworkUrl512?

> `optional` **artworkUrl512**: `string`

Defined in: [lib/types/app-types.ts:23](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L23)

URL to 512px app icon

***

### artworkUrl60?

> `optional` **artworkUrl60**: `string`

Defined in: [lib/types/app-types.ts:27](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L27)

URL to 60px app icon

***

### averageUserRating

> **averageUserRating**: `number`

Defined in: [lib/types/app-types.ts:65](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L65)

Average user rating (0-5)

***

### averageUserRatingForCurrentVersion?

> `optional` **averageUserRatingForCurrentVersion**: `number`

Defined in: [lib/types/app-types.ts:69](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L69)

Average user rating for the current version (0-5)

***

### bundleId

> **bundleId**: `string`

Defined in: [lib/types/app-types.ts:15](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L15)

App bundle identifier (e.g., 'com.example.app')

***

### contentAdvisoryRating

> **contentAdvisoryRating**: `string`

Defined in: [lib/types/app-types.ts:37](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L37)

Age rating (e.g., '4+', '12+', '17+')

***

### currency

> **currency**: `string`

Defined in: [lib/types/app-types.ts:55](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L55)

Currency code for the price

***

### currentVersionReleaseDate?

> `optional` **currentVersionReleaseDate**: `string`

Defined in: [lib/types/app-types.ts:47](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L47)

Release date of the current version (ISO format)

***

### description

> **description**: `string`

Defined in: [lib/types/app-types.ts:21](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L21)

Full app description

***

### fileSizeBytes

> **fileSizeBytes**: `string`

Defined in: [lib/types/app-types.ts:41](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L41)

App size in bytes (as string)

***

### genreIds

> **genreIds**: `string`[]

Defined in: [lib/types/app-types.ts:31](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L31)

List of genre/category IDs

***

### genres

> **genres**: `string`[]

Defined in: [lib/types/app-types.ts:29](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L29)

List of app genres/categories

***

### ipadScreenshotUrls

> **ipadScreenshotUrls**: `string`[]

Defined in: [lib/types/app-types.ts:75](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L75)

URLs to iPad screenshots

***

### languageCodesISO2A

> **languageCodesISO2A**: `string`[]

Defined in: [lib/types/app-types.ts:39](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L39)

ISO 2-letter language codes supported by the app

***

### minimumOsVersion

> **minimumOsVersion**: `string`

Defined in: [lib/types/app-types.ts:43](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L43)

Minimum iOS version required

***

### price

> **price**: `number`

Defined in: [lib/types/app-types.ts:53](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L53)

App price in local currency (0 for free apps)

***

### primaryGenreId

> **primaryGenreId**: `number`

Defined in: [lib/types/app-types.ts:35](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L35)

Primary genre/category ID

***

### primaryGenreName

> **primaryGenreName**: `string`

Defined in: [lib/types/app-types.ts:33](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L33)

Primary genre/category name

***

### releaseDate

> **releaseDate**: `string`

Defined in: [lib/types/app-types.ts:45](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L45)

Initial release date (ISO format)

***

### releaseNotes?

> `optional` **releaseNotes**: `string`

Defined in: [lib/types/app-types.ts:49](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L49)

Notes for the current version update

***

### screenshotUrls

> **screenshotUrls**: `string`[]

Defined in: [lib/types/app-types.ts:73](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L73)

URLs to iPhone screenshots

***

### sellerUrl?

> `optional` **sellerUrl**: `string`

Defined in: [lib/types/app-types.ts:63](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L63)

URL to the developer's website

***

### supportedDevices

> **supportedDevices**: `string`[]

Defined in: [lib/types/app-types.ts:79](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L79)

List of device models compatible with the app

***

### trackId

> **trackId**: `number`

Defined in: [lib/types/app-types.ts:13](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L13)

iTunes app ID

***

### trackName

> **trackName**: `string`

Defined in: [lib/types/app-types.ts:17](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L17)

App name/title

***

### trackViewUrl

> **trackViewUrl**: `string`

Defined in: [lib/types/app-types.ts:19](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L19)

URL to the app's page on the App Store

***

### userRatingCount

> **userRatingCount**: `number`

Defined in: [lib/types/app-types.ts:67](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L67)

Number of user ratings

***

### userRatingCountForCurrentVersion?

> `optional` **userRatingCountForCurrentVersion**: `number`

Defined in: [lib/types/app-types.ts:71](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L71)

Number of user ratings for the current version

***

### version

> **version**: `string`

Defined in: [lib/types/app-types.ts:51](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L51)

Current app version string

***

### wrapperType?

> `optional` **wrapperType**: `string`

Defined in: [lib/types/app-types.ts:81](https://github.com/facundoolano/app-store-scraper/blob/1e0c65b171e0bad4a38692c4616a992bb494cdd4/lib/types/app-types.ts#L81)

Type of item (should be 'software' for apps)
