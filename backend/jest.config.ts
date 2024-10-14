import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  testEnvironment: "node"
};

export default config;