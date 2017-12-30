import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;
const mockFactory = new MockFactory();



describe('/projects/:id/settings', function () {

    // TEST PLAN
    // create project (get projectId)
    // create project settings for that project
    // get settings by project Id
    // validate data and etc
    // cleanup:
    // delete project
    // delete settings

    const projectMock = mockFactory.createProject();
    const settingsMock = mockFactory.createProjectSettings();
    const settingsMockEdited = mockFactory.createProjectSettings();

    let token = '';
    let projectId = '';
    let settingsId = '';


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
                settingsMock.projectId = projectId;
                done();
            });
    });

    it('POST /projects/:id/settings should respond with status 201 and proper JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/projects/' + projectId + '/settings')
            .set('x-access-token', token)
            .send(settingsMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/projects/' + projectId + '/settings');
                settingsId = res.body._id;
                done();
            });
    });



    it('GET /projects/:id/settings should respond with status 200 and with settings by project id', function (done: DoneFn) {

        request(app)
            .get('/api/v1/projects/' + projectId + '/settings')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('projectId', settingsMock.projectId);
                done();
            });
    });


    it('PUT /projects/:id/settings respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/projects/' + projectId + '/settings')
            .set('x-access-token', token)
            .send(settingsMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('projectId', settingsMock.projectId);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('DELETE /projects/:id/settings respond with status 204', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/projects/' + projectId + '/settings')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });



    after('After: Delete project', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/projects/' + projectId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});



