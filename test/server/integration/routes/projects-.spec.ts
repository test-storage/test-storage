import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';

import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

import { Test } from '@nestjs/testing';
import { ProjectsModule } from '../../../../server/modules/projects/projects.module';

import { authenticate } from '../../auth-helper';
import { MockFactory } from '../mocks/mock.factory';

describe('Projects', () => {
  const server = express();
  server.use(bodyParser.json());
  let token: string;
  let entityId: string;

  const mockFactory = new MockFactory();
  const projectMock = mockFactory.createProject();
  const projectMockEdited = mockFactory.createProject();

  const apiPath = '/api/v1/projects';

  before(async () => {
    console.log('setup');
    const module = await Test.createTestingModule({
      imports: [ProjectsModule],
    }).compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  before('login', (done: DoneFn) => {
    authenticate(function (accessToken: string) {
      token = accessToken;
      console.log('login');
      done();
    });
  });

  it(`POST insert Project`, () => {
    // console.log('post ', projectMock);
    request(server)
      .post(apiPath)
      .set('Authorization', `Bearer ${token}`)
      .send(projectMock)
      .expect(201)
      .end((err, res) => {
        console.log(res.body._id);
        entityId = res.body._id;
      });
  });

  it(`GET Project by id`, async done => {
    console.log('get');
    console.log(`${apiPath}/${entityId}`);
    const response = await request(server)
      .get(`${apiPath}/${entityId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const [project] = response.body;

    expect(project.name).to.have.property(projectMock.name);
    expect(project.description).to.have.property(projectMock.description);

    done();
  });

  xit(`GET Projects`, async done => {
    console.log('get');
    const projects = await request(server)
      .get(apiPath)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const [project] = projects.body;

    expect(project.name).to.have.property(projectMock.name);
    expect(project.description).to.have.property(projectMock.description);

    done();
  });
});
