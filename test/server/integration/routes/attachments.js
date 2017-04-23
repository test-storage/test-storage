var request = require('supertest');
var should = require('should');

var app = require('../../../../server.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/attachments', function() {

    it('login', loginUser());

    it('POST /attachments respond with status 201 and JSON', function(done) {
        this.timeout(35000);
        request(server.app)
            .post('/api/v1/attachments')
            .set('x-access-token', token)
            .send({
                "name": "Dummy attachment",
                "description": "Dummy attachment file"
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

    it('GET /attachments/:id respond with JSON', function(done) {
        this.timeout(30000);
        request(server.app)
            .get('/api/v1/attachments/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                res.body.should.have.property('name', 'Dummy attachment');
                res.body.should.have.property('description', 'Dummy attachment file');
                if (err) return done(err);
                done()
            });
    });

    it('GET /attachments respond with JSON', function(done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/attachments')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('description');
                if (err) return done(err);
                done()
            });
    });

    it('PUT /attachments respond with JSON', function(done) {
        this.timeout(55000);
        request(server.app)
            .put('/api/v1/attachments/' + entityId)
            .set('x-access-token', token)
            .send({
                "name": "Dummy attachment edited",
                "description": "Dummy attachment file edited",
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.body.should.have.property('name', 'Dummy attachment edited');
                res.body.should.have.property('description', 'Dummy attachment file edited');
                if (err) return done(err);
                done()
            });
    });


    it('DELETE /attachments/:id respond with JSON', function(done) {
        this.timeout(75000);
        request(server.app)
            .delete('/api/v1/attachments/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect(204)
            .end(function(err, res) {
                res.body.should.not.have.property('name');
                res.body.should.not.have.property('description');
                if (err) return done(err);
                done()
            });
    });

});

function loginUser() {
    return function(done) {
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
