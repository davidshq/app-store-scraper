# 2024-03-24:
- Refactored HTTP request handling in `lib/common.js` to use dependency injection
- Added unit tests for rate limiting, error handling, request functionality
- Exposed internal functions for testing
- Updated docs on throttle parameter for rate limiting
- The app-store-scraper library is now using ESM modules instead of CommonJS. All the API functionality remains the same, but the module system has been updated to use modern JavaScript module syntax.