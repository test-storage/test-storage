import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;
const mockFactory = new MockFactory();

describe('/projects/:id/users', function () {

    // TEST PLAN
    // create project (get projectId)
    // create 2 users for that project
    // get users by project Id
    // validate length and etc
    // cleanup:
    // delete project
    // delete users

    const projectMock = mockFactory.createProject();
    const userMock1 = mockFactory.createUser();
    const userMock2 = mockFactory.createUser();

    let token = '';
    let projectId = '';
    let firstUserId = '';
    let secondUserId = '';


    before('login', function (done: DoneFn) {

        authenticate(function (accessToken) {
            token = accessToken;
            done();
        });
    });

    before('Before: Project created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/projects')
            .set('Authorization', `Bearer ${token}`)
            .send(projectMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/projects/' + res.body._id);
                projectId = res.body._id;
                userMock1.projects[0] = projectId;
                userMock2.projects[0] = projectId;
                done();
            });
    });

    before('Before: User created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .send(userMock1)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/users/' + res.body._id);
                firstUserId = res.body._id;
                done();
            });
    });

    before('Before: User created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .send(userMock2)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/users/' + res.body._id);
                secondUserId = res.body._id;
                done();
            });
    });

    // ============= Tests ================

    it('GET /projects/:id/users should respond with status 200 and with list of users by project id', function (done: DoneFn) {

        request(app)
            .get('/api/v1/projects/' + projectId + '/users')
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(2);
                // in case of all keys
                // expect(res.body[0]).to.have.all.keys(
                expect(res.body[0]).to.not.have.property('password');
                expect(res.body[0]).to.have.any.keys(
                    '_id',
                    'firstName',
                    'lastName',
                    'email',
                    'workInfo',
                    'userGroups',
                    'projects'
                );
                done();
            });
    });


    // =====================================


    after('After: Delete Project', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/projects/' + projectId)
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    after('After: Delete first User', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/users/' + firstUserId)
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    after('After: Delete second User', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/users/' + secondUserId)
            .set('Authorization', `Bearer ${token}`)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});


