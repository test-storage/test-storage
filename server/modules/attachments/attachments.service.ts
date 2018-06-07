import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateAttachmentDto } from './create-attachment.dto';
import { Attachment } from './attachment.interface';

@Injectable()
export class AttachmentsService {

  constructor(@InjectModel('Attachment') private readonly attachmentModel: Model<Attachment>) { }

  async create(attachmentDto: CreateAttachmentDto): Promise<Attachment> {
    const createdAttachment = new this.attachmentModel(attachmentDto);
    return await createdAttachment.save();
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
    return await this.attachmentModel.findOneAndRemove({ '_id': id }).exec();
  }
}
