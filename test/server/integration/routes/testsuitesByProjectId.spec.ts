import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/index';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;
const mockFactory = new MockFactory();


describe('/projects/:id/testsuites', function () {

    // TEST PLAN
    // create project (get projectId)
    // create 2 testsuites for that project
    // get testsuites by project Id
    // validate length and etc
    // cleanup:
    // delete project
    // delete testsuites

    const projectMock = mockFactory.createProject();
    const testsuiteMock1 = mockFactory.createTestsuite();
    const testsuiteMock2 = mockFactory.createTestsuite();

    let token = '';
    let projectId = '';
    let firstTestsuiteId = '';
    let secondTestsuiteId = '';


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
                testsuiteMock1.projectId = projectId;
                testsuiteMock2.projectId = projectId;
                done();
            });
    });

    before('Before: Testsuite created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testsuites')
            .set('x-access-token', token)
            .send(testsuiteMock1)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testsuites/' + res.body._id);
                firstTestsuiteId = res.body._id;
                done();
            });
    });

    before('Before: Testsuite created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testsuites')
            .set('x-access-token', token)
            .send(testsuiteMock2)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testsuites/' + res.body._id);
                secondTestsuiteId = res.body._id;
                done();
            });
    });

    it('GET /projects/:id/testsuites should respond with status 200 and with list of testsuites by project id', function (done: DoneFn) {

        request(app)
            .get('/api/v1/projects/' + projectId + '/testsuites')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(2);
                // in case of all keys
                // expect(res.body[0]).to.have.all.keys(
                expect(res.body[0]).to.have.any.keys(
                    'prerequisites',
                    'projectId',
                    'enabled',
                    'name',
                    'description'
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

    after('After: Delete first Testsuite', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testsuites/' + firstTestsuiteId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    after('After: Delete second Testsuite', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testsuites/' + secondTestsuiteId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });
});



