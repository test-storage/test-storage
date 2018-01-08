import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

chai.use(chaiHttp);
const expect = chai.expect;




describe('Core Tests', function () {

  let token = '';


  before('login', function (done: DoneFn) {
    authenticate(function (accessToken: string) {
      token = accessToken;
      done();
    });
  });

  it('GET /projects respond with Content-Encoding: gzip', function (done: DoneFn) {
    request.agent(app)
      .get('/api/v1/projects')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res).to.have.header('content-type', /json/);
        expect(res).to.have.header('Content-Encoding', 'gzip');
        done();
      });
  });
});
