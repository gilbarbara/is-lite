module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'esnext',
      },
    },
  },
  moduleDirectories: ['node_modules', 'src', './'],
  moduleFileExtensions: ['js', 'ts'],
  preset: 'ts-jest',
  testRegex: '/test/.*?\\.(test|spec)\\.ts$',
  testEnvironment: 'jsdom',
  verbose: false,
};
