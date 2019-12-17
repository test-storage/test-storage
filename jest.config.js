module.exports = {
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
  "setupFilesAfterEnv": [
    "<rootDir>/src/setup-jest.ts"
  ],
  "testRegex": ".spec.ts$",
  "transform": {
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  "transformIgnorePatterns": ['node_modules/(?!@ngrx)'],
  "coverageDirectory": "./coverage"
}
