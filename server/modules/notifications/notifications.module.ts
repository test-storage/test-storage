import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationSchema } from './notification.schema';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }])],
  controllers: [NotificationsController],
  exports: [NotificationsService],
  providers: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule { }
