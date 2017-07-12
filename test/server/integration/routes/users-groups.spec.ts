import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { modelFixture, modelFixtureEdited } from './users-groups.fixtures';

var token = '';
var entityId = '';

before(function (done) {

    it('login', function (done) {
        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });
    done();
});

describe('/users/groups', function () {

    it('POST /users/groups respond with status 201 and JSON', function (done) {

        request(app)
            .post('/api/v1/users/groups')
            .set('x-access-token', token)
            .send(modelFixture)
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

    it('GET /users/groups/:id respond with JSON', function (done) {

        request(app)
            .get('/api/v1/users/groups/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', modelFixture.name);
                expect(res.body).to.have.deep.property('description', modelFixture.description);
                expect(res.body).to.have.deep.property('enabled', modelFixture.enabled);
                expect(res.body).to.have.deep.property('scope');
                expect(res.body.scope).to.have.deep.property('testcases', modelFixture.scope.testcases);
                expect(res.body.scope).to.have.deep.property('testsuites', modelFixture.scope.testsuites);
                expect(res.body).to.have.deep.property('users', modelFixture.users);
                done()
            });
    });

    it('GET /users/groups respond with JSON', function (done) {

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
                    'scope',
                    'users'
                );
                expect(res.body[0].scope).to.have.property('testcases');
                expect(res.body[0].scope).to.have.property('testsuites');
                done()
            });
    });

    it('PUT /users/groups respond with JSON', function (done) {

        request(app)
            .put('/api/v1/users/groups/' + entityId)
            .set('x-access-token', token)
            .send(modelFixtureEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', modelFixtureEdited.name);
                expect(res.body).to.have.deep.property('description', modelFixtureEdited.description);
                expect(res.body).to.have.deep.property('enabled', modelFixtureEdited.enabled);
                expect(res.body).to.have.deep.property('scope');
                expect(res.body.scope).to.have.deep.property('testcases', modelFixtureEdited.scope.testcases);
                expect(res.body.scope).to.have.deep.property('testsuites', modelFixtureEdited.scope.testsuites);
                expect(res.body).to.have.deep.property('users', modelFixtureEdited.users);
                done()
            });
    });


    it('DELETE /users/groups/:id respond with JSON', function (done) {

        request(app)
            .delete('/api/v1/users/groups/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done()
            });
    });

});

