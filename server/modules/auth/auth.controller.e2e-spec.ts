import * as request from 'supertest';
import { expect } from 'chai';

import { ApplicationModule } from './../app.module';
import { UserDto } from './user.dto';

describe('AuthController', () => {

  describe('Get Access Token via valid login and password ', () => {

    it('should return 200 and an object with expiresIn', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'admin'
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(200)
        .then(response => {
          expect(response.body.expiresIn).to.be.equal(360000);
        });

    });

    it('should return 200 and an object with accessToken', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'admin'
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(200)
        .then(response => {
          expect(response.body.accessToken).to.be.a('string');
        });
    });

    it('should return 400 bad request, if fields is empty', async () => {

      const user: UserDto = {
        username: '',
        password: ''
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(400)
        .then(response => {
          expect(response.body.message).to.be.equal('Validation failed');
        });
    });

    it('should return 401 unauthorized, if login is incorrect', async () => {

      const user: UserDto = {
        username: 'any',
        password: 'any'
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(401)
        .then(response => {
          expect(response.body.error).to.be.equal('Unauthorized');
        });
    });

    it('should return 401 unauthorized, if login correct, password incorrect', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'any'
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(401)
        .then(response => {
          expect(response.body.error).to.be.equal('Unauthorized');
        });
    });
  });

});
