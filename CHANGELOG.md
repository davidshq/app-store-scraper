# 2025-03-25:

- Fixed circular dependency issues in endpoint-builder with dynamic imports
- Implemented dependency injection pattern in more modules for better testability
- Updated error handling to use proper Error objects while maintaining backward compatibility
- Fixed all linting errors and improved code quality across the codebase
- Enhanced test cases for better coverage and reliability
- Updated test structure to work properly with ESM modules
- Added documentation for testing approach in TESTING.md
- Added comprehensive TODO list for future improvements
- Added Prettier for consistent code formatting across the project
- Set up pre-commit hooks with Husky and lint-staged to ensure code quality:
  - Runs ESLint on JavaScript files
  - Formats code with Prettier
  - Verifies dependencies with npm ci
  - Checks for security vulnerabilities with npm audit

# 2025-03-24:

- Refactored HTTP request handling in `lib/common.js` to use dependency injection
- Added unit tests for rate limiting, error handling, request functionality
- Exposed internal functions for testing
- Added better documentation for the throttle parameter to control rate limiting
- Updated dependencies to latest compatible versions:
  - debug: 2.2.0 → 4.4.0
  - cheerio: 1.0.0-rc.2 → 1.0.0
  - memoizee: 0.4.15 → 0.4.17
  - ramda: 0.29.0 → 0.29.1
  - Multiple dev dependencies updated
- The app-store-scraper library is now using ESM modules instead of CommonJS. All the API functionality remains the same, but the module system has been updated to use modern JavaScript module syntax.
