import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { testsuiteFixture, editedTestsuiteFixture } from './testsuites.fixtures';

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

describe('/testsuites', function () {

    it('POST /testsuites respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testsuites')
            .set('x-access-token', token)
            .send(testsuiteFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testsuites/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /testsuites/:id respond with JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testsuites/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('parentId', testsuiteFixture.parentId);
                expect(res.body).to.have.deep.property('prerequisites', testsuiteFixture.prerequisites);
                expect(res.body).to.have.deep.property('enabled', testsuiteFixture.enabled);
                expect(res.body).to.have.deep.property('name', testsuiteFixture.name);
                expect(res.body).to.have.deep.property('description', testsuiteFixture.description);
                expect(res.body).to.have.deep.property('environment', testsuiteFixture.environment);
                expect(res.body).to.have.deep.property('testcases', testsuiteFixture.testcases);
                done();
            });
    });

    it('GET /testsuites respond with JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testsuites')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.any.keys(
                    'prerequisites',
                    'projectId',
                    'enabled',
                    'name',
                    'description',
                    'environment',
                    'testcases'
                );
                done();
            });
    });

    it('PUT /testsuites respond with JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/testsuites/' + entityId)
            .set('x-access-token', token)
            .send(editedTestsuiteFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('parentId', editedTestsuiteFixture.parentId);
                expect(res.body).to.have.deep.property('prerequisites', editedTestsuiteFixture.prerequisites);
                expect(res.body).to.have.deep.property('enabled', editedTestsuiteFixture.enabled);
                expect(res.body).to.have.deep.property('name', editedTestsuiteFixture.name);
                expect(res.body).to.have.deep.property('description', editedTestsuiteFixture.description);
                expect(res.body).to.have.deep.property('environment', editedTestsuiteFixture.environment);
                expect(res.body).to.have.deep.property('testcases', editedTestsuiteFixture.testcases);
                done();
            });
    });


    it('DELETE /testsuites/:id respond with JSON', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testsuites/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
