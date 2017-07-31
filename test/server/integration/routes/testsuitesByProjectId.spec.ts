import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { testsuiteFixture, editedTestsuiteFixture } from './testsuites.fixtures';
import { fixture, changedFixture } from './projects.fixtures';


let token = '';
let projectId = '';
let firstTestsuiteId = '';
let secondTestsuiteId = '';


before(function (done: DoneFn) {

    it('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    it('Before: Project created', function (done: DoneFn) {

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
                testsuiteFixture.projectId = projectId;
                editedTestsuiteFixture.projectId = projectId;
                done();
            });
    });

    it('Before: Testsuite created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testsuites')
            .set('x-access-token', token)
            .send(testsuiteFixture)
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

    it('Before: Testsuite created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/testsuites')
            .set('x-access-token', token)
            .send(editedTestsuiteFixture)
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

    done();
});


describe('/projects/:id/testsuites', function () {

    // TEST PLAN
    // create project (get projectId)
    // create 2 testsuites for that project
    // get testsuites by project Id
    // validate length and etc
    // cleanup:
    // delete project
    // delete testsuites

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
                    'description',
                    'environment',
                    'testcases'
                );
                done();
            });
    });



});

after(function (done: DoneFn) {

    it('After: Delete Project', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/projects/' + projectId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('After: Delete first Testsuite', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testsuites/' + firstTestsuiteId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('After: Delete second Testsuite', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/testsuites/' + secondTestsuiteId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    done();
});

