import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

const mockFactory = new MockFactory();


describe('/testsuites', function () {

    const testsuiteMock = mockFactory.createTestsuite();
    const testsuiteMockEdited = mockFactory.createTestsuite();

    let token = '';
    let entityId = '';

    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    it('POST /testsuites respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testsuites')
            .set('Authorization', `Bearer ${token}`)
            .send(testsuiteMock)
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
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('parentId', testsuiteMock.parentId);
                expect(res.body).to.have.deep.property('enabled', testsuiteMock.enabled);
                expect(res.body).to.have.deep.property('name', testsuiteMock.name);
                expect(res.body).to.have.deep.property('description', testsuiteMock.description);
                done();
            });
    });

    it('GET /testsuites respond with JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testsuites')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.any.keys(
                    'projectId',
                    'enabled',
                    'name',
                    'description'
                );
                done();
            });
    });

    it('PUT /testsuites respond with JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/testsuites/' + entityId)
            .set('Authorization', `Bearer ${token}`)
            .send(testsuiteMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('parentId', testsuiteMockEdited.parentId);
                expect(res.body).to.have.deep.property('enabled', testsuiteMockEdited.enabled);
                expect(res.body).to.have.deep.property('name', testsuiteMockEdited.name);
                expect(res.body).to.have.deep.property('description', testsuiteMockEdited.description);
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
