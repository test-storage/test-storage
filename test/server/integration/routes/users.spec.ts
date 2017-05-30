import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { User } from '../../../../src/app/models/user';

var token = '';
var entityId = '';


const modelFixture: User = {
    'firstName': 'Mikhail',
    'lastName': 'Pavlov',
    'email': 'test@teststorage.qa',
    'password': 'password',
    'title': 'Senior Testing Engineer',
    'groups': ['1', '3']
};

const modelFixtureEdited: User = {
    'firstName': 'Lev',
    'lastName': 'Ivanov',
    'email': 'edited@teststorage.qa',
    'password': 'editedpassword',
    'title': 'Testing Engineer',
    'groups': ['2', '4', '5']
};

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
                expect(res.body).to.have.deep.property('firstName', 'Mikhail');
                expect(res.body).to.have.deep.property('lastName', 'Pavlov');
                expect(res.body).to.have.deep.property('email', 'test@teststorage.qa');
                expect(res.body).to.have.deep.property('password', 'password');
                expect(res.body).to.have.deep.property('title', 'Senior Testing Engineer');
                expect(res.body).to.have.deep.property('groups', ['1', '3']);
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
                expect(res.body).to.have.deep.property('firstName', 'Lev');
                expect(res.body).to.have.deep.property('lastName', 'Ivanov');
                expect(res.body).to.have.deep.property('email', 'edited@teststorage.qa');
                expect(res.body).to.have.deep.property('password', 'editedpassword');
                expect(res.body).to.have.deep.property('title', 'Testing Engineer');
                expect(res.body).to.have.deep.property('groups', ['2', '4', '5']);
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

