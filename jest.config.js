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
  moduleDirectories: ['node_modules', 'src', './'],
  moduleFileExtensions: ['js', 'ts'],
  testRegex: '/.*?\\.(test|spec)\\.js$',
  transform: {
    '.*': 'babel-jest',
  },
  verbose: true,
};
