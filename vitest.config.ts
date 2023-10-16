import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
      reporter: ['text', 'lcov'],
    },
    environment: 'happy-dom',
    globals: true,
  },
});
