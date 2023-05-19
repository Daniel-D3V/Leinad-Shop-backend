/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import { config } from "dotenv"
config()

export default {

  clearMocks: true,
  collectCoverage: false,
  coverageProvider: "v8",
  testMatch: [
    "**/*.spec.ts",
    "**/*.test.ts",
  ],
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\.(t|j)sx?$": ["@swc/jest"]
  },
};
