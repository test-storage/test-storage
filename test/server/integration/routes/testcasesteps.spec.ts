import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/index';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/steps', function () {

    const testcaseStepMock = mockFactory.createTestcaseStep();
    const testcaseStepMockEdited = mockFactory.createTestcaseStep();

    let token = '';
    let entityId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    it('POST /steps respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/steps')
            .set('x-access-token', token)
            .send(testcaseStepMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/steps/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /steps/:id respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/steps/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('testcaseId', testcaseStepMock.testcaseId);
                expect(res.body).to.have.deep.property('order', testcaseStepMock.order);
                expect(res.body).to.have.deep.property('action', testcaseStepMock.action);
                expect(res.body).to.have.deep.property('testData', testcaseStepMock.testData);
                expect(res.body).to.have.deep.property('expected', testcaseStepMock.expected);
                expect(res.body).to.have.deep.property('enabled', testcaseStepMock.enabled);
                expect(res.body).to.have.deep.property('executionType', testcaseStepMock.executionType);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('GET /steps respond with status 200 and JSON', function (done: DoneFn) {
        request(app)
            .get('/api/v1/steps')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                // in case of all keys
                // expect(res.body[0]).to.have.all.keys(
                expect(res.body[0]).to.have.any.keys(
                    '_id',
                    'projectId',
                    'testSuiteId',
                    'priority',
                    'order',
                    'preConditions',
                    'title',
                    'description',
                    'steps',
                    'testData',
                    'expected',
                    'postConditions',
                    'tags',
                    'estimate',
                    'status',
                    'enabled',
                    'isAutomated',
                    'created',
                    'updated'
                );
                done();
            });
    });

    it('PUT /steps respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/steps/' + entityId)
            .set('x-access-token', token)
            .send(testcaseStepMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('testcaseId', testcaseStepMockEdited.testcaseId);
                expect(res.body).to.have.deep.property('order', testcaseStepMockEdited.order);
                expect(res.body).to.have.deep.property('action', testcaseStepMockEdited.action);
                expect(res.body).to.have.deep.property('testData', testcaseStepMockEdited.testData);
                expect(res.body).to.have.deep.property('expected', testcaseStepMockEdited.expected);
                expect(res.body).to.have.deep.property('enabled', testcaseStepMockEdited.enabled);
                expect(res.body).to.have.deep.property('executionType', testcaseStepMockEdited.executionType);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });


    it('DELETE /steps/:id respond with status 204', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/steps/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                expect(res.body).to.be.empty;
                done();
            });
    });

});
