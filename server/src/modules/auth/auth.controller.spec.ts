import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidationService } from './auth-validation.service';

import { jwtSecret } from './strategies/jwt.secret';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserDto } from './user.dto';
import { UsersService } from './../users/users.service';

import { getModelToken } from '@nestjs/mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.SECRET || jwtSecret(),
        signOptions: { expiresIn: '1d' },
      })],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
        AuthValidationService,
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {},
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
        accessToken: 'data'
      };

      jest.spyOn(authService, 'login').mockImplementation(() => Promise.resolve(result));

      expect(await authController.login(user)).toEqual(result);
    });
  });
});
