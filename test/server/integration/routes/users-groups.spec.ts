import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/index';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/users/groups', function () {

    const userGroupMock = mockFactory.createUserGroup();
    const userGroupMockEdited = mockFactory.createUserGroup();

    let token = '';
    let entityId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });



    it('POST /users/groups respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/users/groups')
            .set('x-access-token', token)
            .send(userGroupMock)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/groups/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /users/groups/:id respond with JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/users/groups/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', userGroupMock.name);
                expect(res.body).to.have.deep.property('description', userGroupMock.description);
                expect(res.body).to.have.deep.property('enabled', userGroupMock.enabled);
                expect(res.body).to.have.deep.property('scope', userGroupMock.scope);
                done();
            });
    });

    it('GET /users/groups respond with JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/users/groups')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.any.keys(
                    'name',
                    'description',
                    'enabled',
                    'scope'
                );
                done();
            });
    });

    it('PUT /users/groups respond with JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/users/groups/' + entityId)
            .set('x-access-token', token)
            .send(userGroupMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', userGroupMockEdited.name);
                expect(res.body).to.have.deep.property('description', userGroupMockEdited.description);
                expect(res.body).to.have.deep.property('enabled', userGroupMockEdited.enabled);
                expect(res.body).to.have.deep.property('scope', userGroupMockEdited.scope);
                done();
            });
    });


    it('DELETE /users/groups/:id respond with JSON', function (done: DoneFn) {

        request(app)
            .delete('/api/v1/users/groups/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});

