const { defaults } = require('jest-config');

module.exports = {
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.test.js",
    "!src/(utils)/**/*.js",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  testURL: "http://localhost/",
  moduleDirectories: ["node_modules"],
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/internals/testing/test-bundler.js"],
  testRegex: "src/.*\\.test\\.js$",
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/internals/testing/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js'],
};
