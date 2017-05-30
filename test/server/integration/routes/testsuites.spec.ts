import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { Testcasesuite } from '../../../../src/app/models/testcasesuite';

var token = '';
var entityId = '';


const testsuiteFixture: Testcasesuite = {
    'parentId': 0,
    'projectId': 'project',
    'prerequisites': 'Prerequisites 1',
    'enabled': true,
    'name': 'Test suite 1',
    'description': 'Test suite description',
    'environment': 'environment 1',
    'testcases': ['5656567', '6978987', '67667']
};

const editedTestsuiteFixture: Testcasesuite = {
    'parentId': 5,
    'projectId': 'project',
    'prerequisites': 'Prerequisites 1 edited',
    'enabled': false,
    'name': 'Test suite 1 edited',
    'description': 'Test suite description edited',
    'environment': 'environment 1 edited',
    'testcases': ['333', '444', '555']
};


describe('/testsuites', function () {

    it('login', function (done) {

        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /testsuites respond with status 201 and JSON', function (done) {

        request(app)
            .post('/api/v1/testsuites')
            .set('x-access-token', token)
            .send(testsuiteFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/testsuites/' + res.body._id);
                entityId = res.body._id;
                done()
            });
    });

    it('GET /testsuites/:id respond with JSON', function (done) {

        request(app)
            .get('/api/v1/testsuites/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('parentId', 0);
                expect(res.body).to.have.deep.property('prerequisites', 'Prerequisites 1');
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('name', 'Test suite 1');
                expect(res.body).to.have.deep.property('description', 'Test suite description');
                expect(res.body).to.have.deep.property('environment', 'environment 1');
                expect(res.body).to.have.deep.property('testcases', ['5656567', '6978987', '67667']);
                done()
            });
    });

    it('GET /testsuites respond with JSON', function (done) {

        request(app)
            .get('/api/v1/testsuites')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.any.keys(
                    'prerequisites',
                    'projectId',
                    'enabled',
                    'name',
                    'description',
                    'environment',
                    'testcases'
                );
                done()
            });
    });

    it('PUT /testsuites respond with JSON', function (done) {

        request(app)
            .put('/api/v1/testsuites/' + entityId)
            .set('x-access-token', token)
            .send(editedTestsuiteFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('parentId', 5);
                expect(res.body).to.have.deep.property('prerequisites', 'Prerequisites 1 edited');
                expect(res.body).to.have.deep.property('enabled', false);
                expect(res.body).to.have.deep.property('name', 'Test suite 1 edited');
                expect(res.body).to.have.deep.property('description', 'Test suite description edited');
                expect(res.body).to.have.deep.property('environment', 'environment 1 edited');
                expect(res.body).to.have.deep.property('testcases', ['333', '444', '555']);
                done()
            });
    });


    it('DELETE /testsuites/:id respond with JSON', function (done) {

        request(app)
            .delete('/api/v1/testsuites/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done()
            });
    });

});
