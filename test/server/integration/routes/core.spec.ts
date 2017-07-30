import * as request from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { server as app } from '../../../../server/server';
import { authenticate } from '../../auth-helper';

chai.use(chaiHttp);
const expect = chai.expect;

let token = '';

before(function () {

    it('login', function (done: DoneFn) {
        authenticate(function (accessToken: string) {
            token = accessToken;
            done();
        });
    });
});

describe('Core Tests', function () {

    it('GET /projects respond with Content-Encoding: gzip', function (done: DoneFn) {
        request(app)
            .get('/api/v1/projects')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res).to.have.header('content-type', /json/);
                expect(res).to.have.header('Content-Encoding', 'gzip');
                done();
            });
    });
});
