var request = require('supertest');
var should = require('should');

var app = require('../../../../app.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/testcases', function () {

    it('login', loginUser());

    it('POST /testcases respond with status 201 and JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send({
                'parentId': null,
                'priority': 1,
                'order': 2,
                'prerequisites': 'Prerequisites 1',
                'name': 'Testcase 1',
                'description': 'Test case description',
                'steps': ['Check that', 'Check this'],
                'expected': ['Expected that', 'Expected this'],
                'tags': ['first tag', 'second tag'],
                'estimate': 10
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

    it('GET /testcases/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body.should.have.property('_id');
                res.body.should.have.property('parentId', null);
                res.body.should.have.property('priority', 1);
                res.body.should.have.property('order', 2);
                res.body.should.have.property('prerequisites', 'Prerequisites 1');
                res.body.should.have.property('name', 'Testcase 1');
                res.body.should.have.property('description', 'Test case description');
                res.body.should.have.property('steps', ['Check that', 'Check this']);
                res.body.should.have.property('expected', ['Expected that', 'Expected this']);
                res.body.should.have.property('tags', ['first tag', 'second tag']);
                res.body.should.have.property('estimate', 10);
                res.body.should.have.property('status', 'created');
                if (err) return done(err);
                done()
            });
    });

    it('GET /testcases respond with JSON', function (done) {
        request(server.app)
            .get('/api/v1/testcases')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('parentId');
                res.body[0].should.have.property('priority');
                res.body[0].should.have.property('order');
                res.body[0].should.have.property('prerequisites');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('description');
                res.body[0].should.have.property('steps');
                res.body[0].should.have.property('expected');
                res.body[0].should.have.property('tags');
                res.body[0].should.have.property('estimate');
                res.body[0].should.have.property('status');
                if (err) return done(err);
                if (err) return done(err);
                done()
            });
    });

    it('PUT /testcases respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .put('/api/v1/testcases/' + entityId)
            .set('x-access-token', token)
            .send({
                'parentId': 1,
                'priority': 2,
                'order': 3,
                'prerequisites': 'Prerequisites 1 edited',
                'name': 'Testcase 1 edited',
                'description': 'Test case description edited',
                'steps': ['Check that edited', 'Check this edited'],
                'expected': ['Expected that edited', 'Expected this edited'],
                'tags': ['first tag edited', 'second tag edited'],
                'estimate': 15,
                'status': 'approved'
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                res.body.should.have.property('_id');
                res.body.should.have.property('parentId', 1);
                res.body.should.have.property('priority', 2);
                res.body.should.have.property('order', 3);
                res.body.should.have.property('prerequisites', 'Prerequisites 1 edited');
                res.body.should.have.property('name', 'Testcase 1 edited');
                res.body.should.have.property('description', 'Test case description edited');
                res.body.should.have.property('steps', ['Check that edited', 'Check this edited']);
                res.body.should.have.property('expected', ['Expected that edited', 'Expected this edited']);
                res.body.should.have.property('tags', ['first tag edited', 'second tag edited']);
                res.body.should.have.property('estimate', 15);
                res.body.should.have.property('status', 'approved');
                if (err) return done(err);
                done()
            });
    });


    it('DELETE /testcases/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .delete('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect(204)
            .end(function (err, res) {
                res.body.should.not.have.property('_id');
                res.body.should.not.have.property('parentId');
                res.body.should.not.have.property('priority');
                res.body.should.not.have.property('order');
                res.body.should.not.have.property('prerequisites');
                res.body.should.not.have.property('name');
                res.body.should.not.have.property('description');
                res.body.should.not.have.property('steps');
                res.body.should.not.have.property('tags');
                res.body.should.not.have.property('expected');
                res.body.should.not.have.property('status');
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