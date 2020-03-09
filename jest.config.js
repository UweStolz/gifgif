module.exports = {
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/tests/',
    '<rootDir>/src/assets/',
  ],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'vue',
  ],
  testURL: 'http://localhost/',
};
