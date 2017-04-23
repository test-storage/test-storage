var request = require('supertest');
var should = require('should');

var app = require('../../../../server.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/projects', function () {

    it('login', loginUser());

    it('POST /projects respond with status 201 and JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .post('/api/v1/projects')
            .set('x-access-token', token)
            .send({
                "name": "Dummy project",
                "description": "Dummy project description",
                "enabled": true,
                "testcases": [949499, 304040, 3040404, 4034030]
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                // Location header
                res.header.location = res.body._id;
            })
            .end(function (err, res) {
                entityId = res.body._id;
                if (err) return done(err);
                done()
            });
    });

    it('GET /projects/:id respond with JSON', function (done) {
        this.timeout(30000);
        request(server.app)
            .get('/api/v1/projects/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body.should.have.property('name', 'Dummy project');
                res.body.should.have.property('description', 'Dummy project description');
                res.body.should.have.property('enabled', true);
                res.body.should.have.property('testcases', [949499, 304040, 3040404, 4034030]);
                if (err) return done(err);
                done()
            });
    });

    it('GET /projects respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/projects')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('description');
                res.body[0].should.have.property('enabled');
                res.body[0].should.have.property('testcases');
                if (err) return done(err);
                done()
            });
    });

    it('PUT /projects respond with JSON', function (done) {
        this.timeout(55000);
        request(server.app)
            .put('/api/v1/projects/' + entityId)
            .set('x-access-token', token)
            .send({
                "name": "Dummy project edited",
                "description": "Dummy project description edited",
                "enabled": false,
                "testcases": [123, 234, 345, 554]
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                res.body.should.have.property('name', 'Dummy project edited');
                res.body.should.have.property('description', 'Dummy project description edited');
                res.body.should.have.property('enabled', false);
                res.body.should.have.property('testcases', [123, 234, 345, 554]);
                if (err) return done(err);
                done()
            });
    });


    it('DELETE /projects/:id respond with JSON', function (done) {
        this.timeout(75000);
        request(server.app)
            .delete('/api/v1/projects/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect(204)
            .end(function (err, res) {
                res.body.should.not.have.property('name');
                res.body.should.not.have.property('description');
                res.body.should.not.have.property('enabled');
                res.body.should.not.have.property('testcases');
                if (err) return done(err);
                done()
            });
    });

});

function loginUser() {
    return function (done) {
        request(server.app)
            .post('/login')
            .send({ username: 'admin@test-storage.local', password: 'pass123' })
            .end(onResponse);

        function onResponse(err, res) {
            token = res.body.token;
            if (err) return done(err);
            return done();
        }
    };
};
