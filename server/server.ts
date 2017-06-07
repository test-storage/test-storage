import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'errorhandler';
import * as mongoose from 'mongoose';
import * as config from 'config';

import expressValidator = require('express-validator');

const app: express.Application = express();
app.disable('x-powered-by'); // security

if ('development' === app.get('env') || 'test' === app.get('env')) {
  // only use in development (stack traces/errors and etc)
  app.use(errorhandler());
  console.log('NODE_ENV: ' + app.get('env'));
  console.log('mongo config address: ' + config.get('db.path') + '/' + config.get('db.name'));
  console.log('index path: ' + path.join(__dirname, '../index.html'));
  console.log('static path: ' + path.join(__dirname, '../../dist'));
  console.log('/i18n path: ' + path.join(__dirname, '../../i18n'));
}

// Point static path to dist
app.use(express.static(path.join(__dirname, '../../dist')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator()); // this line must be immediately after express.bodyParser()!

/*******************************************************************************
*                                  Database                                    *
*******************************************************************************/

// Use native Node promises
mongoose.Promise = global.Promise;

const connectionString = config.get('db.path') + '/' + config.get('db.name');
const connectionOptions = {
  user: config.get('db.user'),
  pass: config.get('db.password')
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

/*******************************************************************************
*                                   Routes                                     *
*******************************************************************************/

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
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
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

app.use('/i18n', express.static(path.join('./i18n')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

/*******************************************************************************
*                              Server initialization                           *
*******************************************************************************/

/*
 *
 * HTTP configuration
 *
 */
let server;

if (config.get('app.httpsEnabled') === false) {

  app.set('port', process.env.PORT || config.get('app.port.http'));

  server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
  });
} else {

  /*
   *
   *  HTTPS Configuration
   *
   */

  const privateKey = fs.readFileSync(config.get('app.privateKey'), 'utf8');
  const certificate = fs.readFileSync(config.get('app.certificate'), 'utf8');

  const credentials = { key: privateKey, cert: certificate };

  app.set('port', process.env.PORT || config.get('app.port.https'));

  server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
  });
}

export { server };
