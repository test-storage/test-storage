import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/testruns', function () {

    const testrunMock = mockFactory.createTestRun();
    const testrunMockEdited = mockFactory.createTestRun();

    let token = '';
    let entityId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });


    it('POST /testruns respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testruns')
            .set('x-access-token', token)
            .send(testrunMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testruns/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /testruns/:id respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testruns/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', testrunMock.name);
                expect(res.body).to.have.deep.property('description', testrunMock.description);
                expect(res.body).to.have.deep.property('projectId', testrunMock.projectId);
                expect(res.body).to.have.deep.property('builds', testrunMock.builds);
                expect(res.body).to.have.deep.property('environments', testrunMock.environments);
                expect(res.body).to.have.deep.property('platforms', testrunMock.platforms);
                expect(res.body).to.have.deep.property('testcases', testrunMock.testcases);
                expect(res.body).to.have.deep.property('status', testrunMock.status);
                expect(res.body).to.have.deep.property('startDate', testrunMock.startDate);
                expect(res.body).to.have.deep.property('endDate', testrunMock.endDate);
                done();
            });
    });

    it('GET /testruns respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testruns')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.deep.property('name');
                expect(res.body[0]).to.have.deep.property('description');
                expect(res.body[0]).to.have.deep.property('projectId');
                expect(res.body[0]).to.have.deep.property('builds');
                expect(res.body[0]).to.have.deep.property('environments');
                expect(res.body[0]).to.have.deep.property('platforms');
                expect(res.body[0]).to.have.deep.property('testcases');
                expect(res.body[0]).to.have.deep.property('status');
                expect(res.body[0]).to.have.deep.property('startDate');
                expect(res.body[0]).to.have.deep.property('endDate');
                done();
            });
    });

    it('PUT /testruns respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/testruns/' + entityId)
            .set('x-access-token', token)
            .send(testrunMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', testrunMockEdited.name);
                expect(res.body).to.have.deep.property('description', testrunMockEdited.description);
                expect(res.body).to.have.deep.property('projectId', testrunMockEdited.projectId);
                expect(res.body).to.have.deep.property('builds', testrunMockEdited.builds);
                expect(res.body).to.have.deep.property('environments', testrunMockEdited.environments);
                expect(res.body).to.have.deep.property('platforms', testrunMockEdited.platforms);
                expect(res.body).to.have.deep.property('testcases', testrunMockEdited.testcases);
                expect(res.body).to.have.deep.property('status', testrunMockEdited.status);
                expect(res.body).to.have.deep.property('startDate', testrunMockEdited.startDate);
                expect(res.body).to.have.deep.property('endDate', testrunMockEdited.endDate);
                done();
            });
    });


    it('DELETE /testruns/:id respond with status 200', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testruns/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
