import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { Group } from '../../../../src/app/models/group';

var token = '';
var entityId = '';

const modelFixture = {
    'name': 'Dummy user group',
    'description': 'User group for guests',
    'enabled': true,
    'scope': {
        'testcases': 'read-only',
        'testsuites': 'read-only'
    },
    'users': ['949499', '304040', '3040404', '4034030']
};

const modelFixtureEdited = {
    'name': 'Dummy user group edited',
    'description': 'User group for guests edited',
    'enabled': false,
    'scope': {
        'testcases': 'read-only edited',
        'testsuites': 'read-only edited'
    },
    'users': ['111', '222', '333']
};


describe('/groups', function () {

    it('login', function (done) {

        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /groups respond with status 201 and JSON', function (done) {

        request(app)
            .post('/api/v1/groups')
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

    it('GET /groups/:id respond with JSON', function (done) {

        request(app)
            .get('/api/v1/groups/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', 'Dummy user group');
                expect(res.body).to.have.deep.property('description', 'User group for guests');
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('scope');
                expect(res.body.scope).to.have.deep.property('testcases', 'read-only');
                expect(res.body.scope).to.have.deep.property('testsuites', 'read-only');
                expect(res.body).to.have.deep.property('users', ['949499', '304040', '3040404', '4034030']);
                done()
            });
    });

    it('GET /groups respond with JSON', function (done) {

        request(app)
            .get('/api/v1/groups')
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

    it('PUT /groups respond with JSON', function (done) {

        request(app)
            .put('/api/v1/groups/' + entityId)
            .set('x-access-token', token)
            .send(modelFixtureEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', 'Dummy user group edited');
                expect(res.body).to.have.deep.property('description', 'User group for guests edited');
                expect(res.body).to.have.deep.property('enabled', false);
                expect(res.body).to.have.deep.property('scope');
                expect(res.body.scope).to.have.deep.property('testcases', 'read-only edited');
                expect(res.body.scope).to.have.deep.property('testsuites', 'read-only edited');
                expect(res.body).to.have.deep.property('users', ['111', '222', '333']);
                done()
            });
    });


    it('DELETE /groups/:id respond with JSON', function (done) {

        request(app)
            .delete('/api/v1/groups/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done()
            });
    });

});

