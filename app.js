var express = require('express');
var expressValidator = require('express-validator');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
// TODO implement methodOverride if it will be needed
//var methodOverride = require('method-override')
var config = require('config');
var app = express();

if ('development' == app.get('env') || 'test' == app.get('env')) {
  app.use(express.static(path.join(__dirname, '/node_modules')));
  app.use(express.static(path.join(__dirname, '/tools')));
  // only use in development (stack traces/errors and etc)
  app.use(errorhandler());

  //app.use(express.static(__dirname, '/node_modules'));
  //app.use(express.static(__dirname, '/tools'));
  console.log("NODE_ENV: " + app.get('env'));
  console.log("mongo config address: " + config.get('db.mongodb'));
}

// Database

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect(config.get('db.mongodb')) // autogen needed for security? (need investigation)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator()); // this line must be immediately after express.bodyParser()!
app.use(express.static(path.join(__dirname + '/client'))); //Angular2 frontend
app.use(express.static(path.join(__dirname + '/public'))); // static folder for css and images and etc
app.use(favicon(__dirname + '/public/assets/favicon.ico')); // favicon

app.disable('x-powered-by'); // security

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

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});

module.exports = server;