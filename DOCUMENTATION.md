# App Store Scraper API Documentation

This documentation covers the API reference for the app-store-scraper package, a Node.js module to scrape application data from the iTunes/Mac App Store.

## Installation

```bash
npm install app-store-scraper
```

## Quick Start

```javascript
import appStore from 'app-store-scraper';

// Get an app by ID
appStore
  .app({ id: 553834731 })
  .then(app => console.log(`${app.title} by ${app.developer}`))
  .catch(console.error);

// Search for apps
appStore
  .search({ term: 'puzzle games', num: 5 })
  .then(apps => console.log(`Found ${apps.length} apps`))
  .catch(console.error);

// Get app reviews
appStore
  .reviews({
    appId: 'com.midasplayer.apps.candycrushsaga',
    sort: appStore.sort.RECENT,
    page: 1
  })
  .then(result => console.log(`Found ${result.reviews.length} reviews`))
  .catch(console.error);
```

## Caching

The module includes enhanced caching capabilities:

```javascript
// Create a memoized API with custom caching
const memoizedApi = appStore.memoized({
  maxAge: 1000 * 60 * 30, // 30 minutes
  max: 100
});

// Configure different caching per method
const customCachedApi = appStore.configureCaching({
  app: { maxAge: 1000 * 60 * 60 }, // 1 hour for app details
  search: { maxAge: 1000 * 60 * 10 }, // 10 minutes for search results
  reviews: { maxAge: 1000 * 60 * 5 } // 5 minutes for reviews
});

// Clear cache when needed
appStore.clearCache(memoizedApi, 'app'); // Clear just app cache
appStore.clearCache(memoizedApi); // Clear all cache
```

## Available Methods

The app-store-scraper provides the following methods:

- `app` - Retrieves the full details of an application
- `list` - Retrieves a list of applications from one of the App Store collections
- `search` - Searches for apps by a given term
- `developer` - Retrieves a list of apps by the given developer id
- `privacy` - Displays the privacy details for an app
- `suggest` - Returns suggestions to complete a search query term
- `similar` - Returns list of "customers also bought" apps
- `reviews` - Retrieves reviews for an app
- `ratings` - Retrieves the ratings for an app
- `versionHistory` - Retrieves version history for an app

## API Reference

The complete API reference is available in the generated documentation.
