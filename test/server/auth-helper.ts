import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';

import { Test } from '@nestjs/testing';
import { AuthModule } from '../../server/modules/auth/auth.module';

const server = express();
server.use(bodyParser.json());

/**
 * Authenticate a test user.
 *
 *
 * @param {function(token:String)} callback
 */
function authenticate(callback) {

  setup();

  request(server)
    .post('/authentication/login')
    .send({ username: 'admin', password: 'admin' })
    .end(function (err, res) {
      if (err) {
        console.log('' + err);
      }
      return callback(res.body.accessToken);
    });
}

async function setup() {

  const module = await Test.createTestingModule({
    imports: [AuthModule],
  }).compile();

  const app = module.createNestApplication(server);
  await app.init();
}

export { authenticate };
