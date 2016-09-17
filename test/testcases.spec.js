var request = require('supertest');
var express = require('express');

var app = express();

app.get('/testcases', function(req, res) {
  res.status(200).json({ name: 'tobi' });
});

describe('GET /testcases', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/testcases')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});