var request = require('supertest');
var express = require('express');

var app = express();

app.get('/groups', function(req, res) {
  res.status(200).json({
	  "name": "Dummy user group",
	  "description": "User group for guests",
    "scope": {
      "testcases": "read-only",
      "testsuites": "read-only"
    },
	  "users": [949499, 304040, 3040404, 4034030]
  });
});

describe('GET /groups', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/groups')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
         name: "Dummy user group",
	       description: "User group for guests",
         scope: {
           testcases: "read-only",
           testsuites: "read-only"
         },
	       users: [949499, 304040, 3040404, 4034030]
      }, 
      done);
  });
});