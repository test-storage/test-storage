import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/attachments', function () {

    const attachmentMock = mockFactory.createAttachment();
    const attachmentMockEdited = mockFactory.createAttachment();

    let token = '';
    let entityId = '';

    before('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

    it('POST /attachments respond with status 201 and JSON', function (done: DoneFn) {

        request(app)
            .post('/api/v1/attachments')
            .set('x-access-token', token)
            .send(attachmentMock)
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

    it('GET /attachments/:id respond with JSON', function (done: DoneFn) {

        request(app)
            .get('/api/v1/attachments/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', attachmentMock.name);
                expect(res.body).to.have.deep.property('description', attachmentMock.description);
                done();
            });
    });

    it('GET /attachments respond with JSON', function (done: DoneFn) {

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

    it('PUT /attachments respond with JSON', function (done: DoneFn) {

        request(app)
            .put('/api/v1/attachments/' + entityId)
            .set('x-access-token', token)
            .send(attachmentMockEdited)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('_id');
                expect(res.body).to.have.deep.property('name', attachmentMockEdited.name);
                expect(res.body).to.have.deep.property('description', attachmentMockEdited.description);
                done();
            });
    });


    it('DELETE /attachments/:id respond with JSON', function (done: DoneFn) {

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
