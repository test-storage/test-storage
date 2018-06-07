import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AttachmentSchema } from './attachment.schema';
import { AttachmentsController } from './attachments.controller';
import { AttachmentsService } from './attachments.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attachment', schema: AttachmentSchema }])
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService]
})
export class AttachmentsModule { }
