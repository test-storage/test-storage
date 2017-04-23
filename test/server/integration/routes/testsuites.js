var request = require('supertest');
var should = require('should');

var app = require('../../../../server.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/testsuites', function () {

    it('login', loginUser());

    it('POST /testsuites respond with status 201 and JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .post('/api/v1/testsuites')
            .set('x-access-token', token)
            .send({
                "parentId": 0,
                "prerequisites": "Prerequisites 1",
                "enabled": true,
                "name": "Test suite 1",
                "description": "Test suite description",
                "environment": "environment 1",
                "testcases": [5656567, 6978987, 67667]
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

    it('GET /testsuites/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/testsuites/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body.should.have.property('parentId', 0);
                res.body.should.have.property('prerequisites', 'Prerequisites 1');
                res.body.should.have.property('enabled', true);
                res.body.should.have.property('name', 'Test suite 1');
                res.body.should.have.property('description', 'Test suite description');
                res.body.should.have.property('environment', 'environment 1');
                res.body.should.have.property('testcases', [5656567, 6978987, 67667]);
                if (err) return done(err);
                done()
            });
    });

    it('GET /testsuites respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/testsuites')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                // res.body[0].should.have.property('parentId');
                res.body[0].should.have.property('prerequisites');
                res.body[0].should.have.property('enabled');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('description');
                res.body[0].should.have.property('environment');
                res.body[0].should.have.property('testcases');
                if (err) return done(err);
                done()
            });
    });

    it('PUT /testsuites respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .put('/api/v1/testsuites/' + entityId)
            .set('x-access-token', token)
            .send({
                'parentId': 5,
                'prerequisites': 'Prerequisites 1 edited',
                'enabled': false,
                'name': 'Test suite 1 edited',
                'description': 'Test suite description edited',
                'environment': 'environment 1 edited',
                'testcases': [333, 444, 555]
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                res.body.should.have.property('parentId', 5);
                res.body.should.have.property('prerequisites', 'Prerequisites 1 edited');
                res.body.should.have.property('enabled', false);
                res.body.should.have.property('name', 'Test suite 1 edited');
                res.body.should.have.property('description', 'Test suite description edited');
                res.body.should.have.property('environment', 'environment 1 edited');
                res.body.should.have.property('testcases', [333, 444, 555]);
                if (err) return done(err);
                done()
            });
    });


    it('DELETE /testsuites/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .delete('/api/v1/testsuites/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect(204)
            .end(function (err, res) {
                res.body.should.not.have.property('parentId');
                res.body.should.not.have.property('prerequisites');
                res.body.should.not.have.property('enabled');
                res.body.should.not.have.property('name');
                res.body.should.not.have.property('description');
                res.body.should.not.have.property('environment');
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