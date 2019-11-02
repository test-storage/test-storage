import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateNotificationDto } from './create-notification.dto';
import { Notification } from './notification.interface';

@Injectable()
export class NotificationsService {

  constructor(@InjectModel('Notification') private readonly notificationModel: Model<Notification>) { }

  async create(notificationDto: CreateNotificationDto, userId: string): Promise<Notification> {
    const createdNotification = await new this.notificationModel(notificationDto);

    createdNotification.createdBy = userId;
    return await createdNotification.save();
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationModel.find().exec();
  }

  async findAllByRecipientId(id: string): Promise<Notification[]> {
    return await this.notificationModel.find().where('recipientId', id).exec();
  }

  async findOne(id): Promise<Notification> {
    return await this.notificationModel.findOne({ _id: id }).exec();
  }

  async update(id: string, notification: Notification, userId: string): Promise<Notification> {
    const existedNotification = await this.notificationModel.findOne({ _id: id }).exec();
    if (existedNotification) {
      Object.assign(existedNotification, notification);
      existedNotification.updatedBy = userId;
      existedNotification.updated = new Date().toISOString();
      return await existedNotification.save();
    }
  }

  async delete(id): Promise<void> {
    return await this.notificationModel.findOneAndRemove({ _id: id }).exec();
  }
}
