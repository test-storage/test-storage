import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;
const mockFactory = new MockFactory();



describe('/users/:id/settings', function () {

    // TEST PLAN
    // create user (get userId)
    // create user settings for that user
    // get settings by user Id
    // validate data and etc
    // cleanup:
    // delete user
    // delete settings

    const userMock = mockFactory.createUser();
    const settingsMock = mockFactory.createUserSettings();
    const settingsMockEdited = mockFactory.createUserSettings();

    let token = '';
    let userId = '';
    let settingsId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    before('Before: User created', function (done: DoneFn) {

        request(app)
            .post('/api/v1/users')
            .set('x-access-token', token)
            .send(userMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/users/' + res.body._id);
                userId = res.body._id;
                settingsMock.userId = userId;
                done();
            });
    });

    it('POST /users/:id/settings should respond with status 201 and proper JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/users/' + userId + '/settings')
            .set('x-access-token', token)
            .send(settingsMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/users/' + userId + '/settings');
                settingsId = res.body._id;
                done();
            });
    });



    it('GET /users/:id/settings should respond with status 200 and with settings by user id', function (done: DoneFn) {

        request(app)
            .get('/api/v1/users/' + userId + '/settings')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('userId', settingsMock.userId);
                expect(res.body).to.have.deep.property('theme', settingsMock.theme);
                expect(res.body).to.have.deep.property('language', settingsMock.language);
                done();
            });
    });


    it('PUT /users/:id/settings respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/users/' + userId + '/settings')
            .set('x-access-token', token)
            .send(settingsMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('userId', settingsMock.userId);
                expect(res.body).to.have.deep.property('theme', settingsMock.theme);
                expect(res.body).to.have.deep.property('language', settingsMock.language);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('DELETE /users/:id/settings respond with status 204', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/users/' + userId + '/settings')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });



    after('After: Delete user', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/users/' + userId)
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});



