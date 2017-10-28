import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/index';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/testresults', function () {

    const testresultMock = mockFactory.createTestResult();
    const testresultMockEdited = mockFactory.createTestResult();

    let token = '';
    let entityId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });


    it('POST /testresults respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testresults')
            .set('x-access-token', token)
            .send(testresultMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testresults/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /testresults/:id respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testresults/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('testcaseId', testresultMock.testcaseId);
                expect(res.body).to.have.deep.property('testrunId', testresultMock.testrunId);
                expect(res.body).to.have.deep.property('testplanId', testresultMock.testplanId);
                expect(res.body).to.have.deep.property('status', testresultMock.status);
                done();
            });
    });

    it('GET /testresults respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testresults')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.deep.property('testcaseId', testresultMock.testcaseId);
                expect(res.body[0]).to.have.deep.property('testrunId', testresultMock.testrunId);
                expect(res.body[0]).to.have.deep.property('testplanId', testresultMock.testplanId);
                expect(res.body[0]).to.have.deep.property('status', testresultMock.status);
                done();
            });
    });

    it('PUT /testresults respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/testresults/' + entityId)
            .set('x-access-token', token)
            .send(testresultMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                /*
                expect(res.body).to.have.deep.property('testcaseId', testresultMockEdited.testcaseId);
                expect(res.body).to.have.deep.property('testrunId', testresultMockEdited.testrunId);
                expect(res.body).to.have.deep.property('testplanId', testresultMockEdited.testplanId);
                */
                expect(res.body).to.have.deep.property('status', testresultMockEdited.status);
                done();
            });
    });


    it('DELETE /testresults/:id respond with status 200', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testresults/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
