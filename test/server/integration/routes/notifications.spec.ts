import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { fixture, changedFixture } from './notifications.fixtures';

chai.use(chaiHttp);
const expect = chai.expect;

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

describe('/notifications', function () {

    it('POST /notifications respond with status 201 and JSON', function (done) {
        chai.request(app)
            .post('/api/v1/notifications')
            .set('x-access-token', token)
            .send(fixture)
            .end(function (err, res) {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Location', '/api/v1/notifications/' + res.body._id);
                entityId = res.body._id;
                done();
            });
    });

    it('GET /notifications/:id respond with status 200 and JSON', function (done) {
        request(app)
            .get('/api/v1/notifications/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('title', fixture.title);
                expect(res.body).to.have.deep.property('description', fixture.description);
                expect(res.body).to.have.deep.property('entity', fixture.entity);
                expect(res.body).to.have.deep.property('action', fixture.action);
                expect(res.body).to.have.deep.property('senderId', fixture.senderId);
                expect(res.body).to.have.deep.property('recipientId', fixture.recipientId);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('GET /notifications respond with status 200 and JSON', function (done) {
        request(app)
            .get('/api/v1/notifications')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.any.keys(
                    'title',
                    'description',
                    'entity',
                    'action',
                    'senderId',
                    'recipientId',
                    'created',
                    'updated'
                );
                done();
            });
    });

    it('PUT /notifications respond with status 200 and JSON', function (done) {
        request(app)
            .put('/api/v1/notifications/' + entityId)
            .set('x-access-token', token)
            .send(changedFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('title', changedFixture.title);
                expect(res.body).to.have.deep.property('description', changedFixture.description);
                expect(res.body).to.have.deep.property('entity', changedFixture.entity);
                expect(res.body).to.have.deep.property('action', changedFixture.action);
                expect(res.body).to.have.deep.property('senderId', changedFixture.senderId);
                expect(res.body).to.have.deep.property('recipientId', changedFixture.recipientId);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });


    it('DELETE /notifications/:id respond with status 204', function (done) {
        request(app)
            .delete('/api/v1/notifications/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(204);
                done();
            });
    });

});
