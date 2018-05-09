import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateDeviceDto } from './create-device.dto';
import { DeviceSchema } from './device.schema';
import { Device } from './device.interface';

@Component()
export class DevicesService {

  constructor(@InjectModel(DeviceSchema) private readonly deviceModel: Model<Device>) { }

  async create(deviceDto: CreateDeviceDto): Promise<Device> {
    const createdDevice = new this.deviceModel(deviceDto);
    return await createdDevice.save();
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find().exec();
  }

  async findOne(id): Promise<Device> {
    return await this.deviceModel.findOne({ '_id': id }).exec();
  }

  async update(id, device: Device): Promise<Device> {
    const createdOrUpdatedDevice = new this.deviceModel(device);
    return await this.deviceModel.findOneAndUpdate({ '_id': id }, device).exec();
  }

  async delete(id): Promise<void> {
    return await this.deviceModel.findOneAndRemove({ '_id': id }).exec();
  }
}
