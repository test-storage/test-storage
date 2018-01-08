import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

import { MockFactory } from '../mocks/mock.factory';

chai.use(chaiHttp);
const expect = chai.expect;

const mockFactory = new MockFactory();


describe('/projects', function () {

  const projectMock = mockFactory.createProject();
  const projectMockEdited = mockFactory.createProject();

  let token = '';
  let entityId = '';

  before('login', function (done: DoneFn) {
    authenticate(function (accessToken: string) {
      token = accessToken;
      done();
    });
  });


  it('POST /projects respond with status 201 and JSON', function (done: DoneFn) {
    request.agent(app)
      .post('/api/v1/projects')
      .set('Authorization', `Bearer ${token}`)
      .send(projectMock)
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
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.have.header('content-type', /json/);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.deep.property('name', projectMock.name);
        expect(res.body).to.have.deep.property('description', projectMock.description);
        expect(res.body).to.have.deep.property('enabled', projectMock.enabled);
        expect(res.body).to.have.deep.property('created');
        expect(res.body).to.have.deep.property('updated');
        done();
      });
  });

  it('GET /projects respond with status 200 and JSON', function (done: DoneFn) {
    request(app)
      .get('/api/v1/projects')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(projectMockEdited)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.have.header('content-type', /json/);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.deep.property('name', projectMockEdited.name);
        expect(res.body).to.have.deep.property('description', projectMockEdited.description);
        expect(res.body).to.have.deep.property('enabled', projectMockEdited.enabled);
        expect(res.body).to.have.deep.property('created');
        expect(res.body).to.have.deep.property('updated');
        done();
      });
  });


  it('DELETE /projects/:id respond with status 204', function (done: DoneFn) {
    request(app)
      .delete('/api/v1/projects/' + entityId)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.status).to.equal(204);
        done();
      });
  });
});

