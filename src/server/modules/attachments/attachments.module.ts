import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';

import { DatabaseModule } from '../database/database.module';

import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';

import { FileUploadMiddleware } from '../common/middlewares/file-upload.middleware';

@Module({
  modules: [
    DatabaseModule,
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
    })
  }
}
