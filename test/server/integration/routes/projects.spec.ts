import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';
import { fixture, changedFixture } from './projects.fixtures';

chai.use(chaiHttp);
const expect = chai.expect;

let token = '';
let entityId = '';

before(function () {

    it('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });

});

describe('/projects', function () {

    it('POST /projects respond with status 201 and JSON', function (done: DoneFn) {
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

    it('GET /projects/:id respond with status 200 and JSON', function (done: DoneFn) {
        request(app)
            .get('/api/v1/projects/' + entityId)
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', fixture.name);
                expect(res.body).to.have.deep.property('description', fixture.description);
                expect(res.body).to.have.deep.property('enabled', true);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });

    it('GET /projects respond with status 200 and JSON', function (done: DoneFn) {
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
                    'created',
                    'updated'
                );
                done();
            });
    });

    it('PUT /projects respond with status 200 and JSON', function (done: DoneFn) {
        request(app)
            .put('/api/v1/projects/' + entityId)
            .set('x-access-token', token)
            .send(changedFixture)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.deep.property('name', changedFixture.name);
                expect(res.body).to.have.deep.property('description', changedFixture.description);
                expect(res.body).to.have.deep.property('enabled', false);
                expect(res.body).to.have.deep.property('created');
                expect(res.body).to.have.deep.property('updated');
                done();
            });
    });


    it('DELETE /projects/:id respond with status 204', function (done: DoneFn) {
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

