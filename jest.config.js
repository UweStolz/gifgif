module.exports = {
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/helper.ts'],
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
