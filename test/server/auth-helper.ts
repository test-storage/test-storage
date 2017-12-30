import * as request from 'supertest';
import { server } from '../../server/server';

/**
 * Authenticate a test user.
 *
 *
 * @param {function(token:String)} callback
 */
function authenticate(callback) {
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

export { authenticate };
