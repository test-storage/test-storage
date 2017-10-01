import * as compression from 'compression';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'errorhandler';
import * as mongoose from 'mongoose';
import * as config from 'config';

import { Routes } from './routes';
import { ValidateRequest } from './middlewares/validateRequest';

import expressValidator = require('express-validator');

class Server {

  public app: express.Application;

  constructor() {
    this.app = express();
    // configure application
    this.configure();
    // mount static
    this.mountStatic();
    // database
    this.establishDatabaseConnection();
    // routes
    this.mountRoutes();
  }


  public configure() {

    if (config.get('app.enableGzipCompression') === true) {
      // compress all responses
      this.app.use(compression({
        threshold: 0
      }));
    }

    this.app.disable('x-powered-by'); // security

    if ('development' === this.app.get('env') || 'test' === this.app.get('env')) {
      // only use in development (stack traces/errors and etc)
      this.app.use(errorhandler());
      console.log('NODE_ENV: ' + this.app.get('env'));
      console.log('mongo config address: ' + config.get('db.host') + '/' + config.get('db.name'));
    }

    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(expressValidator()); // this line must be immediately after express.bodyParser()!
  }


  public mountStatic() {
    // Point static path to dist
    this.app.use(express.static(path.join(__dirname, '../dist')));

    // i18n for frontend
    this.app.use('/i18n', express.static(path.join('./i18n')));
  }


  public establishDatabaseConnection() {
    // Use native Node promises
    mongoose.Promise = global.Promise;

    const connectionString = config.get('db.scheme') + config.get('db.user') + ':' + config.get('db.password') + '@' +
      config.get('db.host') + '/' + config.get('db.name');

    const connectionOptions = {
      useMongoClient: true
    };

    if (process.env.MONGOLAB_URI) {
      mongoose.connect(process.env.MONGOLAB_URI)
        .then(() => console.log('MongoDB connection successful'))
        .catch((err) => console.error(err));
    } else {
      mongoose.connect(connectionString, connectionOptions)
        .then(() => console.log('MongoDB connection successful'))
        .catch((err) => console.error(err));
    }
  }


  public mountRoutes() {

    this.app.all('/*', function (req, res, next) {
      // CORS headers
      res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      // Set custom headers for CORS
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Refresh-Token');
      if (req.method === 'OPTIONS') {
        res.status(200).end();
      } else {
        next();
      }
    });

    // Auth Middleware - This will check if the token is valid
    // Only the requests that start with /api/v1/* will be checked for the token.
    // Any URL's that do not follow the below pattern should be avoided unless you
    // are sure that authentication is not needed

    this.app.all('/api/v1/*', function (req, res, next) {
      const validateRequest = new ValidateRequest();
      validateRequest.validateRequest(req, res, next);
    });

    // Routes init
    const router = new Routes().router;
    this.app.use('/', router);

    // Catch all other routes and return the index file
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }
}

export default new Server().app;


