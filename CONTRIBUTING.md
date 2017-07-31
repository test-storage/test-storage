# Contributing Guidelines

Some basic conventions for contributing to this project.

### General

Please make sure that there aren't existing pull requests attempting to address the issue mentioned. Likewise, please check for issues related to update, as someone else may be working on the issue in a branch or fork.

* Non-trivial changes should be discussed in an issue first
* Develop in a topic branch, not master
* Squash your commits

### Linting

Please check your code using `npm run lint` before submitting your pull requests, as the CI build will fail if `lint` fails.

### Versioning
Test Storage will be maintained under the [Semantic Versioning](http://semver.org)
guidelines such that release versions will be formatted as `<major>.<minor>.<patch>`
where

* breaking backward compatibility bumps the major,
* new additions while maintaining backward compatibility bumps the minor, and
* bug fixes or miscellaneous changes bumps the patch.

### Commit Message Format

Each commit message should include a **type**, a **scope** and a **subject**:

```
 <type>(<scope>): <subject>
 <BLANK LINE>
 <body>
 <BLANK LINE>
 <footer>
```

Lines should not exceed 100 characters. This allows the message to be easier to read on github as well as in various git tools and produces a nice, neat commit log ie:

```
 #271 feat(standard): add style config and refactor to match
 #270 fix(config): only override publicPath when served by webpack
 #269 feat(eslint-config-defaults): replace eslint-config-airbnb
 #268 feat(config): allow user to configure webpack stats output
```

#### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug or adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation

#### Scope

The scope could be anything specifying place of the commit change. For example `testsuites`,
`testcases`, `api` etc...

#### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

#### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
[reference GitHub issues that this commit closes](https://help.github.com/articles/closing-issues-via-commit-messages/).

#### Referencing issues

Closed bugs should be listed on a separate line in the footer prefixed with "Closes" keyword like this:
```
Closes #234
```

or in case of multiple issues:
```
Closes #123, #245, #992
```

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

Development
======

## Pre-installation
for execution you should also install globally:
```bash
$ npm install -g nodemon @angular/cli
```

## Installation

```bash
$ npm install -g test-storage
```

## Start

Basic dev setup:

```bash
$ npm run dev
```

With Hot module replacement:

```bash
$ npm run hmr
```

## Tests

unit tests:
```
$ ng test --single-run
```
__note:__ For running tests on each file change use:
```
$ ng test
```

e2e tests:
```
$ npm e2e
```

backend tests:
```
$ npm run test:backend
```