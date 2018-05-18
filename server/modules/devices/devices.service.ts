import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateDeviceDto } from './create-device.dto';
import { DeviceSchema } from './device.schema';
import { Device } from './device.interface';

@Injectable()
export class DevicesService {

  constructor(@InjectModel('Device') private readonly deviceModel: Model<Device>) { }

  async create(deviceDto: CreateDeviceDto, userId: string): Promise<Device> {
    const createdDevice = new this.deviceModel(deviceDto);
    return await createdDevice.save();
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find().exec();
  }

  async findOne(id): Promise<Device> {
    return await this.deviceModel.findOne({ '_id': id }).exec();
  }

  async update(id, device: Device, userId: string): Promise<Device> {
    const existedDevice = await this.deviceModel.findOne({ '_id': id }).exec();
    if (existedDevice) {
      Object.assign(existedDevice, device);
      existedDevice.updatedBy = userId;
      existedDevice.updated = new Date().toISOString();
      return await existedDevice.save();
    }
  }

  async delete(id): Promise<void> {
    return await this.deviceModel.findOneAndRemove({ '_id': id }).exec();
  }
}
