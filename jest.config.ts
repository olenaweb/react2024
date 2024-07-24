export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
