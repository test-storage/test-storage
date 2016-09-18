var request = require('supertest');
var express = require('express');

var app = express();

app.get('/users', function(req, res) {
  res.status(200).json({
	  "firstName": "Mikhail",
	  "lastName": "Pavlov",
    "title": "Senior Testing Engineer",
	  "groups": [1, 3]
  });
});

describe('GET /users', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        firstName: "Mikhail",
	      lastName: "Pavlov",
        title: "Senior Testing Engineer",
	      groups: [1, 3]
      }, 
      done);
  });
});