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
    .post('/login')
    .send({ username: 'admin@test-storage.local', password: 'pass123' })
    .end(function (err, res) {
      if (err) {
        console.log('' + err);
      }
      return callback(res.body.token);
    });
};

export { authenticate };
