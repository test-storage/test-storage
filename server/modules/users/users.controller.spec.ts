import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.interface';

import { getModelToken } from '@nestjs/mongoose';

import * as sinon from 'sinon';
import * as chai from 'chai';
const expect = chai.expect;

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
    sinon.restore();
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

      sinon.replace(usersService, 'findAll', sinon.fake.returns(result));

      expect(await usersController.findAll()).to.be.equal(result);
    });
  });
});
