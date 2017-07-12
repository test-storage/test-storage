import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { modelFixture, modelFixtureEdited } from './users.fixtures';
import { fixture, changedFixture } from './projects.fixtures';


var token = '';
var entityId = '';
var projectId = '';
var firstUserId = '';
var secondUserId = '';


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
                modelFixture.projects[0] = projectId;
                modelFixtureEdited.projects[0] = projectId;
                done();
            });
    });

    it('Before: User created', function (done) {

        request(app)
            .post('/api/v1/users')
            .set('x-access-token', token)
            .send(modelFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/users/' + res.body._id);
                firstUserId = res.body._id;
                done()
            });
    });

    it('Before: User created', function (done) {

        request(app)
            .post('/api/v1/users')
            .set('x-access-token', token)
            .send(modelFixtureEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/users/' + res.body._id);
                secondUserId = res.body._id;
                done()
            });
    });

    done();
});


describe('/projects/:id/users', function () {

    // TEST PLAN
    // create project (get projectId)
    // create 2 users for that project
    // get users by project Id
    // validate length and etc
    // cleanup:
    // delete project
    // delete users

    it('GET /projects/:id/users should respond with status 200 and with list of users by project id', function (done) {

        request(app)
            .get('/api/v1/projects/' + projectId + '/users')
            .set('x-access-token', token)
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
                    'work',
                    'title',
                    'userGroups',
                    'projects'
                );
                done();
            });
    });



});

after(function (done) {

    it('After: Delete Project', function (done) {

        request(app)
            .delete('/api/v1/projects/' + projectId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('After: Delete first User', function (done) {

        request(app)
            .delete('/api/v1/users/' + firstUserId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('After: Delete second User', function (done) {

        request(app)
            .delete('/api/v1/users/' + secondUserId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    done();
});

