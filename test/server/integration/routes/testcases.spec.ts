import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/testcases', function () {

    const testcaseMock = mockFactory.createTestcase();
    const testcaseMockEdited = mockFactory.createTestcase();

    let token = '';
    let entityId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    it('POST /testcases respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send(testcaseMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testcases/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /testcases/:id respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('projectId', testcaseMock.projectId);
                expect(res.body).to.have.deep.property('testSuiteId', testcaseMock.testSuiteId);
                expect(res.body).to.have.deep.property('priority', testcaseMock.priority);
                expect(res.body).to.have.deep.property('order', testcaseMock.order);
                expect(res.body).to.have.deep.property('preConditions', testcaseMock.preConditions);
                expect(res.body).to.have.deep.property('title', testcaseMock.title);
                expect(res.body).to.have.deep.property('description', testcaseMock.description);
                expect(res.body).to.have.deep.property('steps', testcaseMock.steps);
                expect(res.body).to.have.deep.property('testData', testcaseMock.testData);
                expect(res.body).to.have.deep.property('expected', testcaseMock.expected);
                expect(res.body).to.have.deep.property('postConditions', testcaseMock.postConditions);
                expect(res.body).to.have.deep.property('tags', testcaseMock.tags);
                expect(res.body).to.have.deep.property('estimate', testcaseMock.estimate);
                expect(res.body).to.have.deep.property('enabled', testcaseMock.enabled);
                expect(res.body).to.have.deep.property('isAutomated', testcaseMock.isAutomated);
                expect(res.body).to.have.deep.property('status', 'CREATED');
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('GET /testcases respond with status 200 and JSON', function (done: DoneFn) {
        request(app)
            .get('/api/v1/testcases')
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

    it('PUT /testcases respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/testcases/' + entityId)
            .set('x-access-token', token)
            .send(testcaseMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('projectId', testcaseMockEdited.projectId);
                expect(res.body).to.have.deep.property('testSuiteId', testcaseMockEdited.testSuiteId);
                expect(res.body).to.have.deep.property('priority', testcaseMockEdited.priority);
                expect(res.body).to.have.deep.property('order', testcaseMockEdited.order);
                expect(res.body).to.have.deep.property('preConditions', testcaseMockEdited.preConditions);
                expect(res.body).to.have.deep.property('title', testcaseMockEdited.title);
                expect(res.body).to.have.deep.property('description', testcaseMockEdited.description);
                expect(res.body).to.have.deep.property('steps',  testcaseMockEdited.steps);
                expect(res.body).to.have.deep.property('testData', testcaseMockEdited.testData);
                expect(res.body).to.have.deep.property('expected', testcaseMockEdited.expected);
                expect(res.body).to.have.deep.property('postConditions', testcaseMockEdited.postConditions);
                expect(res.body).to.have.deep.property('tags', testcaseMockEdited.tags);
                expect(res.body).to.have.deep.property('estimate', testcaseMockEdited.estimate);
                expect(res.body).to.have.deep.property('enabled', testcaseMockEdited.enabled);
                expect(res.body).to.have.deep.property('isAutomated', testcaseMockEdited.isAutomated);
                expect(res.body).to.have.deep.property('status', testcaseMockEdited.status);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });


    it('DELETE /testcases/:id respond with status 204', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testcases/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                expect(res.body).to.be.empty;
                done();
            });
    });

});
