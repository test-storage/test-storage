import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/users', function () {

    const userMock = mockFactory.createUser();
    const userMockEdited = mockFactory.createUser();

    let token = '';
    let entityId = '';

    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });


    it('POST /users respond with status 201 and JSON', function (done: DoneFn) {

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
                entityId = res.body._id;
                done();
            });
    });

    it('GET /users/:id respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/users/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('firstName', userMock.firstName);
                expect(res.body).to.have.deep.property('lastName', userMock.lastName);
                expect(res.body).to.have.deep.property('email', userMock.email);
                expect(res.body).to.not.have.deep.property('password');
                expect(res.body).to.have.deep.property('workInfo', userMock.workInfo);
                expect(res.body).to.have.deep.property('social', userMock.social);
                expect(res.body).to.have.deep.property('userGroups', userMock.userGroups);
                expect(res.body).to.have.deep.property('projects', userMock.projects);
                done();
            });
    });

    it('GET /users respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
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

    it('PUT /users respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/users/' + entityId)
            .set('x-access-token', token)
            .send(userMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('firstName', userMockEdited.firstName);
                expect(res.body).to.have.deep.property('lastName', userMockEdited.lastName);
                expect(res.body).to.have.deep.property('email', userMockEdited.email);
                expect(res.body).to.not.have.deep.property('password');
                expect(res.body).to.have.deep.property('workInfo', userMockEdited.workInfo);
                expect(res.body).to.have.deep.property('social', userMockEdited.social);
                expect(res.body).to.have.deep.property('userGroups', userMockEdited.userGroups);
                expect(res.body).to.have.deep.property('projects', userMockEdited.projects);
                done();
            });
    });


    it('DELETE /users/:id respond with status 204 and JSON', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/users/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

    it('GET /users/me respond with status 200 and JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/users/me')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.not.have.property('password');
                expect(res.body).to.have.any.keys(
                    '_id',
                    'firstName',
                    'lastName',
                    'email',
                    'workInfo',
                    'title',
                    'userGroups',
                    'projects'
                );
                done();
            });
    });
});

