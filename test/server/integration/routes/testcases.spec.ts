import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { testcaseFixture, editedTestCaseFixture } from './testcases.fixtures';


let token = '';
let entityId = '';

before(function (done: DoneFn) {

    it('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });
    done();
});

describe('/testcases', function () {

    it('POST /testcases respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send(testcaseFixture)
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
                expect(res.body).to.have.deep.property('projectId', testcaseFixture.projectId);
                expect(res.body).to.have.deep.property('testSuiteId', testcaseFixture.testSuiteId);
                expect(res.body).to.have.deep.property('priority', 1);
                expect(res.body).to.have.deep.property('order', 2);
                expect(res.body).to.have.deep.property('preConditions', 'Preconditions 1');
                expect(res.body).to.have.deep.property('title', testcaseFixture.title);
                expect(res.body).to.have.deep.property('description', testcaseFixture.description);
                expect(res.body).to.have.deep.property('steps', ['Check that', 'Check this']);
                expect(res.body).to.have.deep.property('testData', ['data1', 'data2']);
                expect(res.body).to.have.deep.property('expected', ['Expected that', 'Expected this']);
                expect(res.body).to.have.deep.property('postConditions', 'Postconditions 1');
                expect(res.body).to.have.deep.property('tags', ['first tag', 'second tag']);
                expect(res.body).to.have.deep.property('estimate', 10);
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('isAutomated', true);
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
            .send(editedTestCaseFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('projectId', editedTestCaseFixture.projectId);
                expect(res.body).to.have.deep.property('testSuiteId', editedTestCaseFixture.testSuiteId);
                expect(res.body).to.have.deep.property('priority', 2);
                expect(res.body).to.have.deep.property('order', 3);
                expect(res.body).to.have.deep.property('preConditions', editedTestCaseFixture.preConditions);
                expect(res.body).to.have.deep.property('title', editedTestCaseFixture.title);
                expect(res.body).to.have.deep.property('description', editedTestCaseFixture.description);
                expect(res.body).to.have.deep.property('steps', ['Check that edited', 'Check this edited']);
                expect(res.body).to.have.deep.property('testData', ['data1 edited', 'data2 edited']);
                expect(res.body).to.have.deep.property('expected', ['Expected that edited', 'Expected this edited']);
                expect(res.body).to.have.deep.property('postConditions', editedTestCaseFixture.postConditions);
                expect(res.body).to.have.deep.property('tags', ['first tag edited', 'second tag edited']);
                expect(res.body).to.have.deep.property('estimate', 15);
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('isAutomated', true);
                expect(res.body).to.have.deep.property('status', editedTestCaseFixture.status);
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
