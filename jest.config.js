module.exports = {
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
