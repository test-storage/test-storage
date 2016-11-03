var request = require('supertest');
var should = require('should');

var app = require('../../app.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/users', function() {

    it('login', loginUser());

    it('POST /users respond with status 201 and JSON', function(done) {
        this.timeout(35000);
        request(server.app)
            .post('/api/v1/users')
            .set('x-access-token', token)
            .send({
                "firstName": "Mikhail",
                "lastName": "Pavlov",
                "email": "test@teststorage.qa",
                "password": "password",
                "title": "Senior Testing Engineer",
                "groups": [1, 3]
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                // Location header
                res.header.location = res.body._id;
            })
            .end(function(err, res) {
                entityId = res.body._id;
                if (err) return done(err);
                done()
            });
    });

    it('GET /users/:id respond with JSON', function(done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/users/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('firstName', 'Mikhail');
                res.body.should.have.property('lastName', 'Pavlov');
                res.body.should.have.property('email', 'test@teststorage.qa');
                res.body.should.have.property('password', 'password');
                res.body.should.have.property('title', 'Senior Testing Engineer');
                res.body.should.have.property('groups', [1, 3]);
                if (err) return done(err);
                done()
            });
    });

    it('GET /users respond with JSON', function(done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                res.body[0].should.have.property('firstName');
                res.body[0].should.have.property('lastName');
                res.body[0].should.have.property('email');
                res.body[0].should.have.property('password');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('groups');
                if (err) return done(err);
                done()
            });
    });

    it('PUT /users respond with JSON', function(done) {
        this.timeout(35000);
        request(server.app)
            .put('/api/v1/users/' + entityId)
            .set('x-access-token', token)
            .send({
                "firstName": "Lev",
                "lastName": "Ivanov",
                "email": "edited@teststorage.qa",
                "password": "editedpassword",
                "title": "Testing Engineer",
                "groups": [2, 4, 5]
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.body.should.have.property('firstName', 'Lev');
                res.body.should.have.property('lastName', 'Ivanov');
                res.body.should.have.property('email', 'edited@teststorage.qa');
                res.body.should.have.property('password', 'editedpassword');
                res.body.should.have.property('title', 'Testing Engineer');
                res.body.should.have.property('groups', [2, 4, 5]);
                if (err) return done(err);
                done()
            });
    });


    it('DELETE /users/:id respond with JSON', function(done) {
        this.timeout(35000);
        request(server.app)
            .delete('/api/v1/users/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect(204)
            .end(function(err, res) {
                res.body.should.not.have.property('firstName');
                res.body.should.not.have.property('lastName');
                res.body.should.not.have.property('email');
                res.body.should.not.have.property('password');
                res.body.should.not.have.property('title');
                res.body.should.not.have.property('groups');
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


