import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidationService } from './auth-validation.service';
import { JwtStrategy } from './passport/jwt.strategy';

import { UserDto } from './user.dto';
import { UsersService } from './../users/users.service';

import { getModelToken } from '@nestjs/mongoose';
import { mockRepository } from './../../repository.mock';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        AuthValidationService,
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockRepository,
        }]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  afterEach(async () => {
    // jest spy restore
  });

  describe('Get Access Token via valid login and password ', () => {
    it('should return an object with token', async () => {

      const user: UserDto = {
        username: 'admin',
        password: 'password',
        rememberMe: false
      };

      const result = {
        expiresIn: 3600,
        accessToken: 'data'
      };

      jest.spyOn(authService, 'getAccessToken').mockImplementation(() => Promise.resolve(result));

      expect(await authController.login(user)).toEqual(result);
    });
  });
});
