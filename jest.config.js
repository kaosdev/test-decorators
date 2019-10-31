module.exports = {
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
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
