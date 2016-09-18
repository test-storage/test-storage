var request = require('supertest');
var express = require('express');

var app = express();

app.get('/testcases', function (req, res) {
  res.status(200).json({
    "parentId": null,
    "name": "testcase 1",
    "description": "dummy testcase 1",
    "prerequisites": "pre",
    "actual": "actual 1",
    "expected": "expected 1"
  });
});

describe('GET /testcases', function () {
  it('respond with json', function (done) {
    request(app)
      .get('/testcases')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        parentId: null,
        name: 'testcase 1',
        description: "dummy testcase 1",
        prerequisites: "pre",
        actual: "actual 1",
        expected: "expected 1"
      },
      done);
  });
});