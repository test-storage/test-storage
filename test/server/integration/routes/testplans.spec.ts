import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { testplanFixture, editedTestplanFixture } from './testplans.fixtures';

chai.use(chaiHttp);
const expect = chai.expect;

let token = '';
let entityId = '';

before(function () {

    it('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

});

describe('/testplans', function () {

    it('POST /testplans respond with status 201 and JSON', function (done: DoneFn) {

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

    it('GET /testplans/:id respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testplans/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', testplanFixture.name);
                expect(res.body).to.have.deep.property('description', testplanFixture.description);
                expect(res.body).to.have.deep.property('builds', testplanFixture.builds);
                expect(res.body).to.have.deep.property('environments', testplanFixture.environments);
                expect(res.body).to.have.deep.property('testruns', testplanFixture.testruns);
                done();
            });
    });

    it('GET /testplans respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testplans')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.deep.property('name');
                expect(res.body[0]).to.have.deep.property('description');
                expect(res.body[0]).to.have.deep.property('builds');
                expect(res.body[0]).to.have.deep.property('environments');
                expect(res.body[0]).to.have.deep.property('testruns');
                done();
            });
    });

    it('PUT /testplans respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/testplans/' + entityId)
            .set('x-access-token', token)
            .send(editedTestplanFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', editedTestplanFixture.name);
                expect(res.body).to.have.deep.property('description', editedTestplanFixture.description);
                expect(res.body).to.have.deep.property('builds', editedTestplanFixture.builds);
                expect(res.body).to.have.deep.property('environments', editedTestplanFixture.environments);
                expect(res.body).to.have.deep.property('testruns', editedTestplanFixture.testruns);
                done();
            });
    });


    it('DELETE /testplans/:id respond with status 200', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testplans/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
