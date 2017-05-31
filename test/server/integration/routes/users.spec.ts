import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { modelFixture, modelFixtureEdited } from './users.fixtures';

var token = '';
var entityId = '';


describe('/users', function () {

    it('login', function (done) {

        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /users respond with status 201 and JSON', function (done) {

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
                entityId = res.body._id;
                done();
            });
    });

    it('GET /users/:id respond with JSON', function (done) {

        request(app)
            .get('/api/v1/users/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('firstName', modelFixture.firstName);
                expect(res.body).to.have.deep.property('lastName', modelFixture.lastName);
                expect(res.body).to.have.deep.property('email', modelFixture.email);
                expect(res.body).to.have.deep.property('password', modelFixture.password);
                expect(res.body).to.have.deep.property('title', modelFixture.title);
                expect(res.body).to.have.deep.property('groups', modelFixture.groups);
                done()
            });
    });

    it('GET /users respond with JSON', function (done) {

        request(app)
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.any.keys(
                    '_id',
                    'firstName',
                    'lastName',
                    'email',
                    'password',
                    'title',
                    'groups'
                );
                done()
            });
    });

    it('PUT /users respond with JSON', function (done) {

        request(app)
            .put('/api/v1/users/' + entityId)
            .set('x-access-token', token)
            .send(modelFixtureEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('firstName', modelFixtureEdited.firstName);
                expect(res.body).to.have.deep.property('lastName', modelFixtureEdited.lastName);
                expect(res.body).to.have.deep.property('email', modelFixtureEdited.email);
                expect(res.body).to.have.deep.property('password', modelFixtureEdited.password);
                expect(res.body).to.have.deep.property('title', modelFixtureEdited.title);
                expect(res.body).to.have.deep.property('groups', modelFixtureEdited.groups);
                done()
            });
    });


    it('DELETE /users/:id respond with JSON', function (done) {

        request(app)
            .delete('/api/v1/users/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done()
            });
    });
});

