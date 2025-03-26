import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js', '**/*.ts'],
    ignores: [
      'node_modules/**',
      'dist/**',
      'vitest.config.ts',
      'docs/**',
      'docs-html/**',
      'coverage/**',
      '.nyc_output/**',
      '.github/**',
      '.husky/**'
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        node: true,
        mocha: true,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin
    },
    rules: {
      // ESLint recommended rules
      'no-const-assign': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': 'off', // Turned off in favor of the TypeScript version
      'constructor-super': 'error',
      'valid-typeof': 'error',

      // TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Prettier integration
      'prettier/prettier': 'error',

      // Additional rules
      'no-console': 'warn',
      'prefer-const': 'warn'
    }
  },
  {
    files: ['test/**/*.js', 'test/**/*.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  }
];
