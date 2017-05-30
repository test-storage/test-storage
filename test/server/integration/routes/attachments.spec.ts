import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { Attachment } from '../../../../src/app/models/attachment';

var token = '';
var entityId = '';

const modelFixture = {
    'name': 'Dummy attachment',
    'description': 'Dummy attachment file'
};

const modelFixtureEdited = {
    'name': 'Dummy attachment edited',
    'description': 'Dummy attachment file edited',
};

describe('/attachments', function () {

    it('login', function (done) {

        authenticate(function (restoken) {
            token = restoken;
            done();
        });
    });

    it('POST /attachments respond with status 201 and JSON', function (done) {

        request(app)
            .post('/api/v1/attachments')
            .set('x-access-token', token)
            .send(modelFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/attachments/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /attachments/:id respond with JSON', function (done) {

        request(app)
            .get('/api/v1/attachments/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', 'Dummy attachment');
                expect(res.body).to.have.deep.property('description', 'Dummy attachment file');
                done();
            });
    });

    it('GET /attachments respond with JSON', function (done) {

        request(app)
            .get('/api/v1/attachments')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.any.keys(
                    'name',
                    'description'
                );
                done();
            });
    });

    it('PUT /attachments respond with JSON', function (done) {

        request(app)
            .put('/api/v1/attachments/' + entityId)
            .set('x-access-token', token)
            .send(modelFixtureEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', 'Dummy attachment edited');
                expect(res.body).to.have.deep.property('description', 'Dummy attachment file edited');
                done();
            });
    });


    it('DELETE /attachments/:id respond with JSON', function (done) {

        request(app)
            .delete('/api/v1/attachments/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
