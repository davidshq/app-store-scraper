# Testing Guide for app-store-scraper

This document describes the testing approach for the app-store-scraper project and provides guidance for writing tests.

## Testing Philosophy

The app-store-scraper project follows these testing principles:

1. **Dependency Injection**: We use dependency injection to make components testable without complex module mocking.
2. **Unit Tests**: Each module should have dedicated unit tests that verify its behavior in isolation.
3. **Integration Tests**: End-to-end tests ensure the full API works as expected with real requests.

## Test Framework

We use Vitest as our test runner and mocking framework. Vitest provides:

- **Test Running**: Fast and efficient test execution
- **Assertions**: Built-in expect API for assertions
- **Mocking**: Built-in mocking capabilities through the `vi` object
  - `vi.spyOn()`: For spying on function calls
  - `vi.fn()`: For creating mock functions
  - `vi.mock()`: For mocking modules
  - `vi.stubGlobal()`: For mocking global objects

## Writing Tests

### Dependency Injection Pattern

Our modules are designed to accept dependencies as parameters, making them easier to test:

```typescript
// Example in endpoint-builder.ts
function createEndpoint<T>({ fetch, validate, transform }: EndpointDeps, dependencies = {}) {
  // Use provided dependencies or fall back to defaults
  const requestFn = dependencies.requestFunction || httpClient.request;

  return function endpoint(opts: Record<string, any>): Promise<T> {
    // Implementation using injected dependencies
    // ...
  };
}
```

### Mocking Example

Here's how to use Vitest's mocking capabilities:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Example with mocks', () => {
  let mockFunction: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Create a mock function
    mockFunction = vi.fn().mockResolvedValue({ data: 'test' });
  });

  it('should call mock function with correct arguments', async () => {
    const result = await someFunction(mockFunction);

    // Verify the mock was called
    expect(mockFunction).toHaveBeenCalled();
    // Verify call arguments
    expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
    // Verify return value
    expect(result).toEqual({ data: 'test' });
  });
});
```

### Test Structure

The test directory contains the following test files:

- `app.test.ts`: Tests for app details fetching
- `app-transform.test.ts`: Tests for app data transformation
- `common.test.ts`: Common utility tests
- `common-utils.test.ts`: Additional common utility tests
- `developer.test.ts`: Developer-related functionality tests
- `endpoint-builder.test.ts`: Endpoint construction tests
- `error-types.test.ts`: Error handling tests
- `http-client.test.ts`: HTTP client functionality tests
- `list.test.ts`: App listing functionality tests
- `memoization.test.ts`: Caching and memoization tests
- `param-utils.test.ts`: Parameter validation and processing tests
- `privacy.test.ts`: Privacy-related functionality tests
- `rate-limiter.test.ts`: Rate limiting functionality tests
- `ratings.test.ts`: App ratings functionality tests
- `reviews.test.ts`: App reviews functionality tests
- `search.test.ts`: Search functionality tests
- `similar.test.ts`: Similar apps functionality tests
- `suggest.test.ts`: App suggestions functionality tests
- `validators.test.ts`: Input validation tests
- `version-history.test.ts`: Version history functionality tests

### Test Examples

Here's an example test using Vitest:

```typescript
import { describe, it, expect } from 'vitest';
import store from '../index.js';
import type { App } from '../lib/types/app-types.js';

describe('App method', () => {
  it('should fetch valid application data', async () => {
    const app = (await store.app({ id: '553834731' })) as App;

    expect(app.appId).toBe('com.midasplayer.apps.candycrushsaga');
    expect(app.title).toBe('Candy Crush Saga');
    expect(app.score).toBeTypeOf('number');
    expect(app.score).toBeGreaterThan(0);
    expect(app.score).toBeLessThanOrEqual(5);
  });

  it('should reject the promise for an invalid id', async () => {
    await expect(store.app({ id: '123' })).rejects.toThrow('App not found (404)');
  });
});
```

## Running Tests

Run the tests with:

```bash
npm test
```

For watching mode during development:

```bash
npm run test:watch
```

For test coverage:

```bash
npm run test:coverage
```

## Test Coverage

We aim for high test coverage, focusing on critical paths and edge cases:

- Core API functionality
- Error handling
- Parameter validation
- Cache behavior
- Rate limiting
- Data transformation
- HTTP client functionality

Coverage reports are generated using the V8 provider. You can view detailed coverage reports after running the coverage command.

## Test Configuration

The Vitest configuration is defined in `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/', 'dist/']
    },
    testTimeout: 8000
  }
});
```

## Contributing Tests

When adding new features, please:

1. Write unit tests for new modules
2. Update existing tests for modified modules
3. Follow the dependency injection pattern
4. Use TypeScript types for better code quality and autocompletion
5. Name test files with the `.test.ts` suffix
6. Ensure all tests pass before submitting changes
7. Run the full test suite with `npm test`
8. Check test coverage with `npm run test:coverage`
