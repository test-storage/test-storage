# Installation

## Dependencies

- mongodb
- node.js

## Pre-installation

- install node.js
- install mongodb

__note:__ `mongo` and `mongod` should be accessible via command line interface

## Installation steps

clone repo then install packages

```
$ cd test-storage
```

```bash
$ npm install
```

run db-init.js script (script connects to test-storage db and create default user for authentication and default user for application)

```bash
$ mongo test-storage install/db-init.js
```

__note:__ to change database user/password for application check config/production.json file

run mongo db with authentication

```bash
mongod --auth
```

## Start

build test-storage

```bash
npm run build
```
start test-storage
```bash
npm start
```

you can access application on `localhost`

## Start using Docker

build test-storage image

```bash
docker-compose build
```

run containters

```bash
docker-compose up
```

you can access application on `localhost`
