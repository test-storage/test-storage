import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/index';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();



describe('/notifications', function () {

    const notificationMock = mockFactory.createNotification();
    const notificationMockEdited = mockFactory.createNotification();

    let token = '';
    let entityId = '';


    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    it('POST /notifications respond with status 201 and JSON', function (done: DoneFn) {
        chai.request(app)
            .post('/api/v1/notifications')
            .set('x-access-token', token)
            .send(notificationMock)
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

    it('GET /notifications/:id respond with status 200 and JSON', function (done: DoneFn) {
        request(app)
            .get('/api/v1/notifications/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('title', notificationMock.title);
                expect(res.body).to.have.deep.property('description', notificationMock.description);
                expect(res.body).to.have.deep.property('entity', notificationMock.entity);
                expect(res.body).to.have.deep.property('action', notificationMock.action);
                expect(res.body).to.have.deep.property('senderId', notificationMock.senderId);
                expect(res.body).to.have.deep.property('recipientId', notificationMock.recipientId);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('GET /notifications respond with status 200 and JSON', function (done: DoneFn) {
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

    it('PUT /notifications respond with status 200 and JSON', function (done: DoneFn) {
        request(app)
            .put('/api/v1/notifications/' + entityId)
            .set('x-access-token', token)
            .send(notificationMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('title', notificationMockEdited.title);
                expect(res.body).to.have.deep.property('description', notificationMockEdited.description);
                expect(res.body).to.have.deep.property('entity', notificationMockEdited.entity);
                expect(res.body).to.have.deep.property('action', notificationMockEdited.action);
                expect(res.body).to.have.deep.property('senderId', notificationMockEdited.senderId);
                expect(res.body).to.have.deep.property('recipientId', notificationMockEdited.recipientId);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });


    it('DELETE /notifications/:id respond with status 204', function (done: DoneFn) {
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
