import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateAttachmentDto } from './dto/create-attachment.dto';

import { Attachment } from './interfaces/attachment.interface';

@Component()
export class AttachmentsService {

  constructor( @Inject('AttachmentModelToken') private readonly attachmentModel: Model<Attachment>) { }

  async create(attachment: Attachment): Promise<Attachment> {
    const createdAttachment = new this.attachmentModel(attachment);
    return await createdAttachment.save((err, attachment) => {
      return attachment;
    });
  }

  async findAll(): Promise<Attachment[]> {
    return await this.attachmentModel.find().exec();
  }

  async findOne(id: string): Promise<Attachment> {
    return await this.attachmentModel.findOne({ '_id': id }).exec();
  }

  async update(id: string): Promise<Attachment> {
    return await this.attachmentModel.findOneAndUpdate({ '_id': id }).exec();
  }

  async delete(id: string): Promise<void> {
    return await this.attachmentModel.findOneAndDelete({ '_id': id }).exec();
  }
}
