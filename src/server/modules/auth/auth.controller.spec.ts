import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      modules: [UsersModule],
      controllers: [AuthController],
      components: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('getToken', () => {
    it('should return an object with token', async () => {
      const user = {
        username: 'admin',
        password: 'password'
      };
      const result = {
        expires_in: 3600,
        access_token: 'data'
      };

      spyOn(authService, 'getAccessToken').and.returnValue(result);

      expect(await authController.login(user)).toBe(result);
    });
  });
});
