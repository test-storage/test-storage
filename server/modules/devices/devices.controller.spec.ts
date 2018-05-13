import { Test } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device } from './device.interface';

describe('DevicesController', () => {
  let devicesController: DevicesController;
  let devicesService: DevicesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [DevicesService],
    }).compile();

    devicesService = module.get<DevicesService>(DevicesService);
    devicesController = module.get<DevicesController>(DevicesController);
  });

  describe('findAll', () => {
    it('should return an array of devices', async () => {

    });
  });
});
