import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

chai.use(chaiHttp);
const expect = chai.expect;

var token = '';
var entityId = '';

const testplanFixture = {
    'name': 'Test plan dummy',
    'description': 'Test plan dummy description',
    'builds': ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244'],
    'environments': ['Stage', 'Production'],
    'testruns': [23, 24, 25]
};

const editedTestplanFixture = {
    'name': 'Test plan dummy edited',
    'description': 'Test plan dummy description edited',
    'builds': ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244', '2.0.0'],
    'environments': ['Dev', 'Stage', 'Production'],
    'testruns': [26, 27, 28]
};



describe('/testplans', function () {

    it('login', function (done) {

        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /testplans respond with status 201 and JSON', function (done) {

        request(app)
            .post('/api/v1/testplans')
            .set('x-access-token', token)
            .send(testplanFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testplans/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /testplans/:id respond with status 200 and JSON', function (done) {

        request(app)
            .get('/api/v1/testplans/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', 'Test plan dummy');
                expect(res.body).to.have.deep.property('description', 'Test plan dummy description');
                expect(res.body).to.have.deep.property('builds', ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244']);
                expect(res.body).to.have.deep.property('environments', ['Stage', 'Production']);
                expect(res.body).to.have.deep.property('testruns', [23, 24, 25]);
                done()
            });
    });

    it('GET /testplans respond with status 200 and JSON', function (done) {

        request(app)
            .get('/api/v1/testplans')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.deep.property('name', 'Test plan dummy');
                expect(res.body[0]).to.have.deep.property('description', 'Test plan dummy description');
                expect(res.body[0]).to.have.deep.property('builds', ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244']);
                expect(res.body[0]).to.have.deep.property('environments', ['Stage', 'Production']);
                expect(res.body[0]).to.have.deep.property('testruns', [23, 24, 25]);
                done()
            });
    });

    it('PUT /testplans respond with status 200 and JSON', function (done) {

        request(app)
            .put('/api/v1/testplans/' + entityId)
            .set('x-access-token', token)
            .send(editedTestplanFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', 'Test plan dummy edited');
                expect(res.body).to.have.deep.property('description', 'Test plan dummy description edited');
                expect(res.body).to.have.deep.property('builds', ['2.4.0', '4.3.5', '1.0.3-RC5', '2.5-beta', '1.0.0.244', '2.0.0']);
                expect(res.body).to.have.deep.property('environments', ['Dev', 'Stage', 'Production']);
                expect(res.body).to.have.deep.property('testruns', [26, 27, 28]);
                done()
            });
    });


    it('DELETE /testplans/:id respond with status 200', function (done) {

        request(app)
            .delete('/api/v1/testplans/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done()
            });
    });

    /*
        'configurations', [
            {
                'os': 'iOS',
                'osVersion': '10.1',
                'architecture': 'x64'
            }]);
    */
});
