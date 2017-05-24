var request = require('supertest');
var should = require('should');

var app = require('../../../../server.js');
var authHelper = require('../../auth-helper.js');
var server = request.agent(app);
var token = "";

var entityId = "";

describe('/testplans', function () {

    it('login', function (done) {
        this.timeout(35000);
        authHelper.authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /testplans respond with status 201 and JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .post('/api/v1/testplans')
            .set('x-access-token', token)
            .send({
                "name": "Test plan dummy",
                "description": "Test plan dummy description",
                "builds": ["2.4.0", "4.3.5", "1.0.3-RC5", "2.5-beta", "1.0.0.244"],
                /*     "configurations": [
                         {
                             "os": "Android",
                             "osVersion": "6.1",
                             "architecture": "ARMv8",
                             "browser": "Chrome"
                         }],
                         */
                "environments": ["Stage", "Production"],
                "testruns": [23, 24, 25]
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

    it('GET /testplans/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/testplans/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body.should.have.property('name', 'Test plan dummy');
                res.body.should.have.property('description', 'Test plan dummy description');
                res.body.should.have.property('builds', ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244']);
                /*       res.body.should.have.property('configurations', [
                           {
                               "os": "Android",
                               "osVersion": "6.1",
                               "architecture": "ARMv8",
                               "browser": "Chrome"
                           }]);
                           */
                res.body.should.have.property('environments', ['Stage', 'Production']);
                res.body.should.have.property('testruns', [23, 24, 25]);
                if (err) return done(err);
                done()
            });
    });

    it('GET /testplans respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .get('/api/v1/testplans')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body[0].should.have.property('name', 'Test plan dummy');
                res.body[0].should.have.property('description', 'Test plan dummy description');
                res.body[0].should.have.property('builds', ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244']);
                /*   res.body[0].should.have.property('configurations', [
                       {
                           "os": "Android",
                           "osVersion": "6.1",
                           "architecture": "ARMv8",
                           "browser": "Chrome"
                       }]); */
                res.body[0].should.have.property('environments', ['Stage', 'Production']);
                res.body[0].should.have.property('testruns', [23, 24, 25]);
                if (err) return done(err);
                done()
            });
    });

    it('PUT /testplans respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .put('/api/v1/testplans/' + entityId)
            .set('x-access-token', token)
            .send({
                "name": "Test plan dummy edited",
                "description": "Test plan dummy description edited",
                "builds": ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244', '2.0.0'],
                /*    "configurations": [
                        {
                            "os": "iOS",
                            "osVersion": "10.1",
                            "architecture": "x64"
                        }], */
                "environments": ['Dev', 'Stage', 'Production'],
                "testruns": [26, 27, 28]
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                res.body.should.have.property('name', 'Test plan dummy edited');
                res.body.should.have.property('description', 'Test plan dummy description edited');
                res.body.should.have.property('builds', ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244', '2.0.0']);
                /*   res.body.should.have.property('configurations', [
                       {
                           "os": "iOS",
                           "osVersion": "10.1",
                           "architecture": "x64"
                       }]); */
                res.body.should.have.property('environments', ['Dev', 'Stage', 'Production']);
                res.body.should.have.property('testruns', [26, 27, 28]);
                if (err) return done(err);
                done()
            });
    });


    it('DELETE /testplans/:id respond with JSON', function (done) {
        this.timeout(35000);
        request(server.app)
            .delete('/api/v1/testplans/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect(204)
            .end(function (err, res) {
                res.body.should.not.have.property('name');
                res.body.should.not.have.property('description');
                res.body.should.not.have.property('builds');
                //     res.body.should.not.have.property('configurations');
                res.body.should.not.have.property('environments');
                res.body.should.not.have.property('testruns');
                if (err) return done(err);
                done()
            });
    });

});
