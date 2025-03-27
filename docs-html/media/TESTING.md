# Testing Guide for app-store-scraper

This document describes the testing approach for the app-store-scraper project and provides guidance for writing tests.

## Testing Philosophy

The app-store-scraper project follows these testing principles:

1. **Dependency Injection**: We use dependency injection to make components testable without complex module mocking.
2. **Unit Tests**: Each module should have dedicated unit tests that verify its behavior in isolation.
3. **Integration Tests**: End-to-end tests ensure the full API works as expected with real requests.

## Test Framework

We use Vitest as our test runner with these supporting libraries:

- **Chai**: For assertions and expectations (via Vitest's built-in expect)
- **Sinon**: For mocks, stubs, and spies

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

### Test Helpers

We provide test helpers in `test/helpers/` to create mock functions:

```typescript
// Example usage
import { createMockAppFunction } from './helpers/test-utils.js';

// In your test
const mockAppFn = createMockAppFunction();
const endpoint = createEndpoint<App>({...}, { appFunction: mockAppFn });
```

### ESM Module Testing

Testing ES Modules presents challenges for mocking. We use these approaches:

1. **Dependency Injection**: Pass mocks as arguments instead of trying to mock imports
2. **Dynamic Imports**: Use dynamic imports to avoid circular dependencies
3. **Function Spies**: Test behavior by spying on functions rather than mocking modules

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

Coverage reports are generated in HTML, JSON, and text formats using the V8 provider. You can view detailed coverage reports in the `coverage` directory after running the coverage command.

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
