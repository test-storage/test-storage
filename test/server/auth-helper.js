'use strict';

var request = require('supertest');
var app = require('../../server.js');

/**
 * Authenticate a test user.
 *
 *
 * @param {function(token:String)} callback
 */
exports.authenticate = function (callback) {
  request(app)
    .post('/login')
    .send({ username: 'admin@test-storage.local', password: 'pass123' })
    .end(function (err, res) {
      if (err) {
        console.log("" + err);
      }
      return callback(res.body.token);
    });
};