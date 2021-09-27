module.exports = {
  displayName: 'test-storage',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleFileExtensions: ['js', 'json', 'html', 'ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  coverageDirectory: '../../coverage/apps/test-storage',

  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic|@cds|lit-html)',
  ],

  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};

/*

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
  moduleFileExtensions: ['js', 'json', 'html', 'ts'],
  testRegex: '.spec.ts$',
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  rootDir: '.',
  roots: ['src'],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic|@cds|lit-html)',
  ],
  transform: {
    '^.+\\.(ts|html)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  coverageDirectory: './coverage',
  projects: '<rootDir>/apps/api',
};
*/
