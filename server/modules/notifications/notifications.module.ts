import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationSchema } from './notification.schema';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule { }
