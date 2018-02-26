import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { User } from './interfaces/user.interface';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  const connectionProvider = { provide: 'UserModelToken', useFactory: null, inject: ['DbConnectionToken'] };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      components: [UsersService, connectionProvider],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {

      const result: User[] = [
        { email: 'User', password: 'pass', lastName: 'lastname', firstName: 'firstname' }
      ];

      spyOn(usersService, 'findAll').and.returnValue(result);

      expect(await usersController.findAll()).toBe(result);
    });
  });
});
