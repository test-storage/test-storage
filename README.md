## Test Storage
[![Build Status](https://travis-ci.org/test-storage/test-storage.svg?branch=master)](https://travis-ci.org/test-storage/test-storage) [![Build status](https://ci.appveyor.com/api/projects/status/9g6k7px0r3hdbloi?svg=true)](https://ci.appveyor.com/project/pumano/test-storage) [![NSP Status](https://nodesecurity.io/orgs/test-storage/projects/f8157ca4-b754-4a15-9b5f-14bde759d897/badge)](https://nodesecurity.io/orgs/test-storage/projects/f8157ca4-b754-4a15-9b5f-14bde759d897) [![Telegram](https://img.shields.io/badge/telegram-join%20chat-blue.svg?style=flat)](https://telegram.me/joinchat/Dz6MkggusIGwAUb4Qg1hwQ)

Test Storage - test case management system.

Currently in early alpha development and **currently not available via npm**.

Production
======

## Dependencies
- mongodb
- node.js

## Pre-installation

* install node.js
* install mongodb

__note:__ `mongo` and `mongod` should be accessible via command line interface

for execution you should also install globally:
```bash
$ npm install -g nodemon @angular/cli
```

## Installation

```bash
$ npm install -g test-storage
```

## Start
```
$ cd test-storage
```

1. run db-init.js script (script connects to test-storage db and create default user for authentication)

```bash
$ mongo test-storage config/db-init.js
```

__note:__ to change database user/password for application check config/development.json or config/production.json files

2. run mongo db with authentication

```bash
$ mongod --auth
```

3. Start test-storage

```bash
$ npm start
```

Docker image will be provided soon.

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

## Tests

unit tests:
```
$ npm test
```
__note:__ `npm test` runs tests once. For running tests on each file change use:
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

## Start

```bash
$ npm run dev
```

## Change log
If you want to take a look at [change log](https://github.com/pumano/test-storage/blob/master/CHANGELOG.md) just click [here](https://github.com/pumano/test-storage/blob/master/CHANGELOG.md).

More features will be supported shortly!
