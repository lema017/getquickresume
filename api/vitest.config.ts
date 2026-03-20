import { defineConfig } from 'vitest/config';

/** Production code measured for aggregate coverage (handlers, middleware, services, utils, shared types). */
const coverageInclude = [
  'src/handlers/**/*.ts',
  'src/middleware/**/*.ts',
  'src/services/**/*.ts',
  'src/utils/**/*.ts',
  'src/types.ts',
];

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: coverageInclude,
      exclude: [
        'node_modules/**',
        'dist/**',
        '.build/**',
        'scripts/**',
        '**/*.test.ts',
        'src/test-utils/**',
        'src/types/node-fetch.d.ts',
      ],
      /* Per-file 80% on handlers and services (see docs/API_TEST_COVERAGE.md).
         Top-level metrics omitted so the global bucket is skipped; only globs apply.
         `perFile: true` applies to every threshold bucket (Vitest 3). */
      thresholds: {
        perFile: true,
        'src/handlers/**/*.ts': {
          lines: 80,
          statements: 80,
          branches: 80,
          functions: 80,
        },
        /* All services except aiService.ts (monolith; branch-heavy prompt matrix). */
        'src/services/!(aiService).ts': {
          lines: 80,
          statements: 80,
          branches: 80,
          functions: 80,
        },
        'src/services/aiService.ts': {
          lines: 75,
          statements: 75,
          branches: 25,
          functions: 93,
        },
      },
    },
  },
});
