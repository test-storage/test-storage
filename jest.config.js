// require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$",
      "astTransformers": [
        "jest-preset-angular/build/InlineFilesTransformer",
        "jest-preset-angular/build/StripStylesTransformer"
      ]
    }
  },
  "moduleFileExtensions": [
    "js",
    "json",
    "html",
    "ts"
  ],
  "testRegex": ".spec.ts$",
  "preset": "jest-preset-angular",
  "moduleNameMapper": {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^assets/(.*)$': '<rootDir>/src/assets/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
  },
  "rootDir": ".",
  "roots": [
    "src"
  ],
  transformIgnorePatterns: [
      "node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic|@cds|lit-html)"
  ],
  transform: {
    "^.+\\.(ts|html)$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  "coverageDirectory": "./coverage"
}
