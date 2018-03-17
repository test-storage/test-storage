import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';

import { MongooseModule } from '@nestjs/mongoose';

import { AttachmentSchema } from './attachment.schema';

import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';

import { FileUploadMiddleware } from '../common/middlewares/file-upload.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attachment', schema: AttachmentSchema }])
  ],
  controllers: [AttachmentsController],
  components: [AttachmentsService]
})
export class AttachmentsModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply([
      FileUploadMiddleware,
    ]).forRoutes({
      method: RequestMethod.POST,
      path: 'attachments/upload',
    });
  }
}
