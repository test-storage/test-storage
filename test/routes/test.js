var request = require('supertest');
var should = require("should");

var app = require('../../app.js');
var server = request.agent(app);
var token = "";

describe('GET /testcases', function () {

  it('login', loginUser());

  it('uri that requires user to be logged in', function(done){
    this.timeout(15000);
    request(server.app)
        .get('/api/v1/testcases')
        .set('x-access-token', token)                  
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
            if (err) return done(err);
            done()
        });
    });
  
  it('respond with json', function (done) {
    request(server.app)
      .get('/api/v1/testcases')
      .set('Accept', 'application/json')
      .set('x-access-token', token)    
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
            //res.body.should.have.property('name');
            if (err) return done(err);
            done()
        });
    }); 

    it('GET /testcases/:id and respond with json', function (done) {
    request(server.app)
      .get('/api/v1/testcases/57dee974a8ec3ad48830d106')
      .set('Accept', 'application/json')
      .set('x-access-token', token)    
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
            res.body.should.have.property('name');
            if (err) return done(err);
            done()
        });
    }); 
});

function loginUser() {
    return function(done) {
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