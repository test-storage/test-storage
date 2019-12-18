import * as request from 'supertest';

import { ApplicationModule } from './../app.module';
import { UserDto } from './user.dto';

xdescribe('AuthController', () => {

  describe('Get Access Token via valid login and password ', () => {

    it('should return 200 and an object with expiresIn', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'admin',
        rememberMe: false
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(200)
        .then(response => {
          expect(response.body.expiresIn).toEqual(86400);
        });

    });

    it('should return 200 and an object with expiresIn for a week when remember me checked', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'admin',
        rememberMe: true
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(200)
        .then(response => {
          expect(response.body.expiresIn).toEqual(604800);
        });

    });

    it('should return 200 and an object with accessToken', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'admin',
        rememberMe: false
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(200)
        .then(response => {
          expect(typeof response.body.accessToken).toBe('string');
        });
    });

    it('should return 400 bad request, if fields is empty', async () => {

      const user: UserDto = {
        username: '',
        password: '',
        rememberMe: false
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(400)
        .then(response => {
          expect(response.body.message).toEqual('Validation failed');
        });
    });

    it('should return 401 unauthorized, if login is incorrect', async () => {

      const user: UserDto = {
        username: 'any',
        password: 'any',
        rememberMe: false
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(401)
        .then(response => {
          expect(response.body.error).toEqual('Unauthorized');
        });
    });

    it('should return 401 unauthorized, if login correct, password incorrect', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'any',
        rememberMe: false
      };

      return await request('localhost:3000')
        .post('/authentication/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect(401)
        .then(response => {
          expect(response.body.error).toEqual('Unauthorized');
        });
    });
  });

});
