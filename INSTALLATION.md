Installation
======

## Dependencies
- mongodb
- node.js

## Pre-installation

* install node.js
* install mongodb

__note:__ `mongo` and `mongod` should be accessible via command line interface

## Installation

```bash
$ npm install -g test-storage
```

## Start
```
$ cd test-storage
```

1. run db-init.js script (script connects to test-storage db and create default user for authentication and default user for application)

```bash
$ mongo test-storage install/db-init.js
```

__note:__ to change database user/password for application check config/production.json file

2. run mongo db with authentication

```bash
$ mongod --auth
```

3. Start test-storage

```bash
$ npm start
```

__note:__ Docker image will be provided soon.