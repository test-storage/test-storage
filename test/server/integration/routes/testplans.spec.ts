import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/testplans', function () {

    const testplanMock = mockFactory.createTestPlan();
    const testplanMockEdited = mockFactory.createTestPlan();

    let token = '';
    let entityId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });


    it('POST /testplans respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testplans')
            .set('Authorization', `Bearer ${token}`)
            .send(testplanMock)
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
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', testplanMock.name);
                expect(res.body).to.have.deep.property('description', testplanMock.description);
                expect(res.body).to.have.deep.property('projectId', testplanMock.projectId);
                expect(res.body).to.have.deep.property('builds', testplanMock.builds);
                expect(res.body).to.have.deep.property('environments', testplanMock.environments);
                expect(res.body).to.have.deep.property('platforms', testplanMock.platforms);
                expect(res.body).to.have.deep.property('testcases', testplanMock.testcases);
                expect(res.body).to.have.deep.property('status', testplanMock.status);
                expect(res.body).to.have.deep.property('startDate', testplanMock.startDate);
                expect(res.body).to.have.deep.property('endDate', testplanMock.endDate);
                done();
            });
    });

    it('GET /testplans respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testplans')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
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

    it('PUT /testplans respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/testplans/' + entityId)
            .set('Authorization', `Bearer ${token}`)
            .send(testplanMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', testplanMockEdited.name);
                expect(res.body).to.have.deep.property('description', testplanMockEdited.description);
                expect(res.body).to.have.deep.property('projectId', testplanMockEdited.projectId);
                expect(res.body).to.have.deep.property('builds', testplanMockEdited.builds);
                expect(res.body).to.have.deep.property('environments', testplanMockEdited.environments);
                expect(res.body).to.have.deep.property('platforms', testplanMockEdited.platforms);
                expect(res.body).to.have.deep.property('testcases', testplanMockEdited.testcases);
                expect(res.body).to.have.deep.property('status', testplanMockEdited.status);
                expect(res.body).to.have.deep.property('startDate', testplanMockEdited.startDate);
                expect(res.body).to.have.deep.property('endDate', testplanMockEdited.endDate);
                done();
            });
    });


    it('DELETE /testplans/:id respond with status 200', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testplans/' + entityId)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
