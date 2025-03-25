# Testing Guide for app-store-scraper

This document describes the testing approach for the app-store-scraper project and provides guidance for writing tests.

## Testing Philosophy

The app-store-scraper project follows these testing principles:

1. **Dependency Injection**: We use dependency injection to make components testable without complex module mocking.
2. **Unit Tests**: Each module should have dedicated unit tests that verify its behavior in isolation.
3. **Integration Tests**: End-to-end tests ensure the full API works as expected with real requests.

## Test Framework

We use Mocha as our test runner with these supporting libraries:
- **Chai**: For assertions and expectations
- **Sinon**: For mocks, stubs, and spies

## Writing Tests

### Dependency Injection Pattern

Our modules are designed to accept dependencies as parameters, making them easier to test:

```javascript
// Example in endpoint-builder.js
function createEndpoint({ fetch, validate, transform }, dependencies = {}) {
  // Use provided dependencies or fall back to defaults
  const requestFn = dependencies.requestFunction || common.request;
  
  return function endpoint(opts) {
    // Implementation using injected dependencies
  };
}
```

### Test Helpers

We provide test helpers in `test/helpers/test-utils.js` to create mock functions:

```javascript
// Example usage
import { createMockAppFunction } from './helpers/test-utils.js';

// In your test
const mockAppFn = createMockAppFunction();
const endpoint = createEndpoint({...}, { appFunction: mockAppFn });
```

### ESM Module Testing

Testing ES Modules presents challenges for mocking. We use these approaches:

1. **Dependency Injection**: Pass mocks as arguments instead of trying to mock imports
2. **Dynamic Imports**: Use dynamic imports to avoid circular dependencies
3. **Function Spies**: Test behavior by spying on functions rather than mocking modules

### Skipped Tests

Some tests may be skipped with `it.skip()` when they require mocking ES module exports, which is difficult. We're working on a better long-term solution.

## Migration Strategy

We are following a phased approach to improve testing:

1. **Current**: Add dependency injection and test utilities 
2. **Planned**: Refactor more components to use dependency injection
3. **Future**: Consider migrating to Jest or Vitest for better ESM support

## Running Tests

Run the tests with:

```bash
npm test
```

For debugging tests, you can use:

```bash
node --inspect-brk --experimental-vm-modules node_modules/mocha/bin/mocha --timeout 8000
```

## Test Coverage

We aim for high test coverage, focusing on critical paths and edge cases:

- Core API functionality
- Error handling
- Parameter validation
- Cache behavior

## Contributing Tests

When adding new features, please:

1. Write unit tests for new modules
2. Update existing tests for modified modules
3. Follow the dependency injection pattern
4. Use test helpers for common mocking needs 