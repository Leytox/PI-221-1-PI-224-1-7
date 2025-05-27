module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Оновлено до jsdom
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-auth|@auth)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'], // Додано setupFiles
  setupFilesAfterEnv: ['./jest.setup.js'],
};