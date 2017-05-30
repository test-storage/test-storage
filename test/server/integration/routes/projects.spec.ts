import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { Project } from '../../../../src/app/models/project';

chai.use(chaiHttp);
const expect = chai.expect;

var token = '';
var entityId = '';

const fixture: Project = {
    'name': 'Dummy project',
    'description': 'Dummy project description',
    'enabled': true,
    'testcases': ['949499', '304040', '3040404', '4034030']
};

const changedFixture: Project = {
    'name': 'Dummy project edited',
    'description': 'Dummy project description edited',
    'enabled': false,
    'testcases': ['123', '234', '345', '554']
};

describe('/projects', function () {

    it('login', function (done) {
        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /projects respond with status 201 and JSON', function (done) {
        chai.request(app)
            .post('/api/v1/projects')
            .set('x-access-token', token)
            .send(fixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/projects/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /projects/:id respond with status 200 and JSON', function (done) {
        request(app)
            .get('/api/v1/projects/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', 'Dummy project');
                expect(res.body).to.have.deep.property('description', 'Dummy project description');
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('testcases', ['949499', '304040', '3040404', '4034030']);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('GET /projects respond with status 200 and JSON', function (done) {
        request(app)
            .get('/api/v1/projects')
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
                    'testcases',
                    'created',
                    'updated'
                );
                done();
            });
    });

    it('PUT /projects respond with status 200 and JSON', function (done) {
        request(app)
            .put('/api/v1/projects/' + entityId)
            .set('x-access-token', token)
            .send(changedFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', 'Dummy project edited');
                expect(res.body).to.have.deep.property('description', 'Dummy project description edited');
                expect(res.body).to.have.deep.property('enabled', false);
                expect(res.body).to.have.deep.property('testcases', ['123', '234', '345', '554']);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });


    it('DELETE /projects/:id respond with status 204', function (done) {
        request(app)
            .delete('/api/v1/projects/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
