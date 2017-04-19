var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var expressValidator = require('express-validator');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var mongoose = require('mongoose');
// TODO implement methodOverride if it will be needed
//var methodOverride = require('method-override')
var config = require('config');

var app = express();

if ('development' == app.get('env') || 'test' == app.get('env')) {
  // only use in development (stack traces/errors and etc)
  app.use(errorhandler());
  console.log("NODE_ENV: " + app.get('env'));
  console.log("mongo config address: " + config.get('db.path'));
}

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator()); // this line must be immediately after express.bodyParser()!

//app.use(express.static(path.join(__dirname + '/public'))); // static folder for css and images and etc
//app.use(express.static(path.join(__dirname + '/i18n')));
app.disable('x-powered-by'); // security

/*******************************************************************************
*                                  Database                                    *
*******************************************************************************/
// Use native Node promises

mongoose.Promise = global.Promise;

var connectionString = config.get('db.path') + "/" + config.get('db.name');
var connectionOptions = {
  user: config.get('db.user'),
  pass: config.get('db.password')
};

mongoose.connect(connectionString, connectionOptions)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error(err));


/*******************************************************************************
*                                   Routes                                     *
*******************************************************************************/

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./server/middlewares/validateRequest')]);

app.use('/', require('./server/routes'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/*******************************************************************************
*                              Server initialization                           *
*******************************************************************************/

/*
 *
 * HTTP configuration
 *
 */

if (config.get('app.httpsEnabled') == false) {

  app.set('port', process.env.PORT || config.get('app.port.http'));

  var server = app.listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
  });
} else {

  /*
   *
   *  HTTPS Configuration
   *
   */

  var privateKey = fs.readFileSync(config.get('app.privateKey'), 'utf8');
  var certificate = fs.readFileSync(config.get('app.certificate'), 'utf8');

  var credentials = { key: privateKey, cert: certificate };

  app.set('port', process.env.PORT || config.get('app.port.https'));

  var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
  });
}

module.exports = server;