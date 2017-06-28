import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { testcaseFixture, editedTestCaseFixture } from './testcases.fixtures';
import { fixture, changedFixture } from './projects.fixtures';


var token = '';
var entityId = '';
var projectId = '';
var firstTestcaseId = '';
var secondTestcaseId = '';


before(function (done) {

    it('login', function (done) {
        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('Before: Project created', function (done) {

        request(app)
            .post('/api/v1/projects')
            .set('x-access-token', token)
            .send(fixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/projects/' + res.body._id);
                projectId = res.body._id;
                testcaseFixture.projectId = projectId;
                editedTestCaseFixture.projectId = projectId;
                done();
            });
    });

    it('Before: Testcase created', function (done) {

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
                firstTestcaseId = res.body._id;
                done();
            });
    });

    it('Before: Testcase created', function (done) {

        request(app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send(editedTestCaseFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testcases/' + res.body._id);
                secondTestcaseId = res.body._id;
                done();
            });
    });

    done();
});

describe('/projects/:id/testcases', function () {

    // TEST PLAN
    // create project (get projectId)
    // create 2 testcases for that project
    // get testcases by project Id
    // validate length and etc
    // cleanup:
    // delete project
    // delete testcases

    it('GET /projects/:id/testcases should respond with status 200 and with list of testcases by project id', function (done) {

        request(app)
            .get('/api/v1/projects/' + projectId + '/testcases')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(2);
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
});

after('Cleanup', function (done) {

    it('After: Delete Project', function (done) {

        request(app)
            .delete('/api/v1/projects/' + projectId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('After: Delete first Testcase', function (done) {

        request(app)
            .delete('/api/v1/testcases/' + firstTestcaseId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('After: Delete second Testcase', function (done) {

        request(app)
            .delete('/api/v1/testcases/' + secondTestcaseId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    done();
});
