import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DeviceSchema } from './device.schema';

import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }])],
  controllers: [DevicesController],
  providers: [
    DevicesService
  ],
})
export class DevicesModule { }
