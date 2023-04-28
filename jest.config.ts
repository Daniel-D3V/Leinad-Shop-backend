/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {

  clearMocks: true,
  collectCoverage: false,
  coverageProvider: "v8",
  testMatch: [
    '<rootDir>/src/**/*.test.js',
    '<rootDir>/src/**/*.spec.js',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\.(t|j)sx?$": ["@swc/jest"]
  }
};
