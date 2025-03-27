# app-store-scraper [![Build Status](https://secure.travis-ci.org/facundoolano/app-store-scraper.png)](http://travis-ci.org/facundoolano/app-store-scraper)

A Node.js module to scrape application data from the iTunes/Mac App Store.
The goal is to provide an interface as close as possible to the
[google-play-scraper](https://github.com/facundoolano/google-play-scraper) module.

## Requirements

- Node.js >= 16.0.0
- npm or yarn

## Installation

```bash
npm install app-store-scraper
# or
yarn add app-store-scraper
```

## Documentation

For detailed API reference documentation, please see the [API Documentation](./docs/README.md).

## Usage

Available methods:

- [app](#app): Retrieves the full details of an application.
- [list](#list): Retrieves a list of applications from one of the collections at iTunes.
- [search](#search): Retrieves a list of apps that result from searching by a given term.
- [developer](#developer): Retrieves a list of apps by the given developer id.
- [privacy](#privacy): Display the privacy details for the app.
- [suggest](#suggest): Given a string returns up to 50 suggestions to complete a search query term.
- [similar](#similar): Returns the list of "customers also bought" apps shown in the app's detail page.
- [reviews](#reviews): Retrieves a page of reviews of the app.
- [ratings](#ratings): Retrieves the ratings of the app.
- [versionHistory](#versionHistory): Retrieves the version history of the app.

### Caching

The module includes enhanced caching capabilities:

- [memoized](#memoized): Creates a memoized version of the API.
- [configureCaching](#configureCaching): Configures custom caching per endpoint.
- [clearCache](#clearCache): Clears cache entries.

### TypeScript Support

The module includes comprehensive TypeScript type definitions, making it easier to integrate in TypeScript projects:

```typescript
import appStore, { App, AppOptions } from 'app-store-scraper';

// All method parameters and return types are properly typed
const options: AppOptions = { id: 553834731 };
appStore.app(options).then((app: App) => {
  console.log(app.title);
  console.log(app.price);
});
```

The type definitions include:

- All API method parameter options
- Return types for all API responses
- Constant values (categories, collections, etc.)
- Caching configuration
- Error types and utilities

### Error Handling

The module includes comprehensive error handling with typed errors:

```typescript
import appStore, { AppStoreError } from 'app-store-scraper';

try {
  await appStore.app({ id: 553834731 });
} catch (error) {
  if (error instanceof AppStoreError) {
    console.error(`App Store Error: ${error.message}`);
    console.error(`Error Code: ${error.code}`);
  }
}
```

### Rate Limiting

The module includes built-in rate limiting to prevent API throttling:

```typescript
import appStore from 'app-store-scraper';

// Rate limiting is enabled by default
// You can configure it using the rateLimiter option
const options = {
  rateLimiter: {
    maxRequests: 10, // Maximum number of requests
    perSecond: 1 // Per second
  }
};
```

### Development

To contribute to the project:

```bash
# Install dependencies
npm install

# Run tests
npm test
npm run test:watch    # Watch mode
npm run test:coverage # With coverage

# Lint and format code
npm run lint
npm run format

# Generate documentation
npm run docs         # Markdown docs
npm run docs:html    # HTML docs

# Type checking
npm run check-types

# Clean build artifacts
npm run clean
npm run clean:all    # Clean all generated files
```

### CI/CD

The project includes CI/CD configuration with:

- Automated testing
- Coverage reporting
- Type checking
- Linting
- Documentation generation

Use `npm run test:ci` for CI environments.
