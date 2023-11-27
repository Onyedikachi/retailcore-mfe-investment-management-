module.exports = {
  rootDir: "src",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|xlsx)$":
      "<rootDir>/__mocks__/fileMocks.js",
    "^@app/(.*)$": "<rootDir>/$1",
    "^@Sterling/shared$": "<rootDir>/__mocks__/@Sterling/shared.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/setupTests.ts"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
  ],
  coveragePathIgnorePatterns: ["\\.styles\\.ts$"],
  testResultsProcessor: "jest-sonar-reporter",
};
