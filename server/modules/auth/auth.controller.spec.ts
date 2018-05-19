import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { UserDto } from './user.dto';

import { getModelToken } from '@nestjs/mongoose';

import * as sinon from 'sinon';
import * as chai from 'chai';
const expect = chai.expect;

xdescribe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy, {
        provide: getModelToken('User'),
        useValue: {},
      }]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('Get Access Token via valid login and password ', () => {
    it('should return an object with token', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'password'
      };

      const result = {
        expiresIn: 3600,
        accessToken: 'data'
      };

      sinon.replace(authService, 'getAccessToken', sinon.fake.returns(result));

      expect(authController.login(user)).to.be.equal(result);
    });
  });
});
