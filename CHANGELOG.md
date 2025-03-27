# 2025-03-27:

- Replaced Sinon with Vitest's built-in mocking capabilities for better test consistency
- Fixed TypeScript errors in test files related to mock typing
- Improved test assertions to match actual function behavior
- Enhanced caching system with method-specific cache configurations
- Added comprehensive TypeScript documentation and examples
- Improved error handling and validation across all modules
- Added new versionHistory endpoint for retrieving app version history
- Enhanced app data transformation with better type safety
- Updated ESLint configuration for better code quality
- Added support for custom request options across all endpoints
- Enhanced developer experience with better TypeScript support
- Improved documentation with detailed API examples

# 2025-03-26:

- Improved error types for better error handling
- Fixed tests and removed problematic ESLint plugins
- Replaced bottleneck with limiter for rate limiting
- Generated updated documentation
- Refactored JavaScript tests to TypeScript
- Deleted obsolete tests and added new ones
- Fixed rate-limiter and http-client test implementations
- Completed migration of tests to Vitest
- Standardized validators across the codebase
- Updated dependencies and improved error messaging for validators
- Refactored common.ts into specialized utility modules:
  - types/app-types.ts: Type definitions
  - utils/app-transform.ts: Data transformations
  - utils/rate-limiter.ts: Request throttling
  - utils/http-client.ts: HTTP requests
  - utils/store-utils.ts: Store utilities
  - api/itunes-api.ts: API interactions
- Maintained backward compatibility via common.ts facade
- Fixed developer.ts module to properly handle developer metadata
- Enhanced iTunes API lookup with proper entity filtering
- Completed migration to TypeScript

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

- Migrated codebase from CommonJS to ESM modules
- Refactored HTTP request handling in `lib/common.js` to use dependency injection
- Added unit tests for rate limiting, error handling, request functionality
- Exposed internal functions for testing
- Added better documentation for the throttle parameter to control rate limiting
- Fixed dependency issues and extracted validators to separate modules
- Added `.test` suffix to test files for better differentiation from app code
- Fixed npm audit security vulnerabilities
- Updated GitHub Actions workflows and added TODOs for future improvements
- Added support for Node.js 20+
- Replaced deprecated `request` library with `got` and `throttled-request` with `bottleneck`
- Fixed failing tests and skipped unnecessary ones
- Updated code comments for better documentation
- Fixed linting errors across the codebase
- Updated dependencies to latest compatible versions:
  - debug: 2.2.0 → 4.4.0
  - cheerio: 1.0.0-rc.2 → 1.0.0
  - memoizee: 0.4.15 → 0.4.17
  - ramda: 0.29.0 → 0.29.1
  - Multiple dev dependencies updated
- The app-store-scraper library now uses ESM modules instead of CommonJS while maintaining the same API functionality
