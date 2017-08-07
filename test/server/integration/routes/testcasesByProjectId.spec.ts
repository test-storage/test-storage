import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;
const mockFactory = new MockFactory();



describe('/projects/:id/testcases', function () {

    // TEST PLAN
    // create project (get projectId)
    // create 2 testcases for that project
    // get testcases by project Id
    // validate length and etc
    // cleanup:
    // delete project
    // delete testcases

    const projectMock = mockFactory.createProject();
    const testcaseMock1 = mockFactory.createTestcase();
    const testcaseMock2 = mockFactory.createTestcase();

    let token = '';
    let projectId = '';
    let firstTestcaseId = '';
    let secondTestcaseId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    before('Before: Project created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/projects')
            .set('x-access-token', token)
            .send(projectMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/projects/' + res.body._id);
                projectId = res.body._id;
                testcaseMock1.projectId = projectId;
                testcaseMock2.projectId = projectId;
                done();
            });
    });

    before('Before: Testcase created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send(testcaseMock1)
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

    before('Before: Testcase created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testcases')
            .set('x-access-token', token)
            .send(testcaseMock2)
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




    after('After: Delete Project', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/projects/' + projectId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    after('After: Delete first Testcase', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testcases/' + firstTestcaseId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    after('After: Delete second Testcase', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testcases/' + secondTestcaseId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});



