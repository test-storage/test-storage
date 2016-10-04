var request = require('supertest');
var should = require('should');

var app = require('../../app.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/groups', function () {

  it('login', loginUser());

  it('POST /groups respond with status 201 and JSON', function (done) {
    this.timeout(35000);
    request(server.app)
      .post('/api/v1/groups')
      .set('x-access-token', token)
      .send({
        "name": "Dummy user group",
        "description": "User group for guests",
        "scope": {
          "testcases": "read-only",
          "testsuites": "read-only"
        },
        "users": [949499, 304040, 3040404, 4034030]
      })
      .expect(201)
      //.expect('Location')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        entityId = res.body._id;
        if (err) return done(err);
        done()
      });
  });

  it('GET /groups/:id respond with JSON', function (done) {
    this.timeout(35000);
    request(server.app)
      .get('/api/v1/groups/' + entityId)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.should.have.property('name');
        res.body.should.have.property('description');
        res.body.should.have.property('scope');
        res.body.scope.should.have.property('testcases');
        res.body.scope.should.have.property('testsuites');
        res.body.should.have.property('users');
        if (err) return done(err);
        done()
      });
  });

  it('GET /groups respond with JSON', function (done) {
    this.timeout(35000);
    request(server.app)
      .get('/api/v1/groups')
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('description');
        res.body[0].should.have.property('scope');
        res.body[0].scope.should.have.property('testcases');
        res.body[0].scope.should.have.property('testsuites');
        res.body[0].should.have.property('users');
        if (err) return done(err);
        done()
      });
  });

  it('PUT /groups respond with JSON', function (done) {
    this.timeout(35000);
    request(server.app)
      .put('/api/v1/groups/' + entityId)
      .set('x-access-token', token)
      .send({
        "name": "Dummy user group edited",
        "description": "User group for guests edited",
        "scope": {
          "testcases": "read-only edited",
          "testsuites": "read-only edited"
        },
        "users": [111, 222, 333]
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        res.body.should.have.property('name', 'Dummy user group edited');
        res.body.should.have.property('description', 'User group for guests edited');
        res.body.should.have.property('scope');
        res.body.scope.should.have.property('testcases', 'read-only edited');
        res.body.scope.should.have.property('testsuites', 'read-only edited');
        res.body.should.have.property('users', [111, 222, 333]);
        if (err) return done(err);
        done()
      });
  });


  it('DELETE /groups/:id respond with JSON', function (done) {
    this.timeout(35000);
    request(server.app)
      .delete('/api/v1/groups/' + entityId)
      .set('Accept', 'application/json')
      .set('x-access-token', token)
      .expect(204)
      .end(function (err, res) {
      res.body.should.not.have.property('name');
        res.body.should.not.have.property('description');
        res.body.should.not.have.property('scope');
        res.body.should.not.have.property('users');
        if (err) return done(err);
        done()
      });
  });

});

function loginUser() {
  return function (done) {
    request(server.app)
      .post('/login')
      .send({ username: 'arvind@myapp.com', password: 'pass123' })
      .end(onResponse);

    function onResponse(err, res) {
      token = res.body.token;
      if (err) return done(err);
      return done();
    }
  };
};
