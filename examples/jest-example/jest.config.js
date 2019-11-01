module.exports = {
  testMatch: ["**/__tests__/**/*.example.ts?(x)"],
  roots: [
    '__tests__/',
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json'
    }
  }
};
