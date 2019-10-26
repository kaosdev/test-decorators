module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'packages/**/*.{ts}',
    '!**/node_modules/**',
  ],
  roots: [
    'packages/',
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json'
    }
  }
};
