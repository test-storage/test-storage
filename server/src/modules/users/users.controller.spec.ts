import { Test } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.interface';

import { getModelToken } from '@nestjs/mongoose';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getModelToken('User'),
          useValue: {},
        }]
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  afterEach(async () => {
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {

      const result: User[] = [
        {
          email: 'User',
          password: 'pass',
          lastName: 'lastname',
          firstName: 'firstname',
          active: true,
          role: 'administrator',
        }
      ];

      jest.spyOn(usersService, 'findAll').mockImplementation(() => Promise.resolve(result));

      expect(await usersController.findAll()).toEqual(result);
    });
  });
});
