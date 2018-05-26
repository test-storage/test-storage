import { Test } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device } from './device.interface';

import { getModelToken } from '@nestjs/mongoose';

import * as sinon from 'sinon';
import * as chai from 'chai';
const expect = chai.expect;

describe('DevicesController', () => {
  let devicesController: DevicesController;
  let devicesService: DevicesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [DevicesService, {
        provide: getModelToken('Device'),
        useValue: {},
      }],
    }).compile();

    devicesService = module.get<DevicesService>(DevicesService);
    devicesController = module.get<DevicesController>(DevicesController);
  });

  afterEach(async () => {
    sinon.restore();
  });

  describe('findAll', () => {
    it('should return an array of devices', async () => {
      const result: Device[] = [
        {
          manufacturer: 'name',
          model: '',
          type: 'MOBILE',
          os: '',
          osVersion: '',
          description: 'description',
          assignedTo: ['']
        },
        {
          manufacturer: 'name',
          model: '',
          type: 'TABLET',
          os: '',
          osVersion: '',
          description: 'description',
          assignedTo: ['']
        }
      ];

      sinon.replace(devicesService, 'findAll', sinon.fake.returns(result));

      expect(await devicesController.findAll()).to.be.equal(result);
    });
  });
});
