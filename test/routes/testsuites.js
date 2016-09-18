var request = require('supertest');
var express = require('express');

var app = express();

app.get('/testsuites', function(req, res) {
  res.status(200).json({
	  "name": "Dummy ad-hoc testsuite",
	  "description": "dummy testsuite for ad-hoc testing",
	  "prerequisites": "prepare environment",
    "environment": "Linux x64",
	  "testcases": [949499, 304040, 3040404, 4034030]
  });
});

describe('GET /testsuites', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/testsuites')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        name: "Dummy ad-hoc testsuite",
	      description: "dummy testsuite for ad-hoc testing",
	      prerequisites: "prepare environment",
        environment: "Linux x64",
	      testcases: [949499, 304040, 3040404, 4034030]
      }, 
      done);
  });
});