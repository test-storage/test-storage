import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import { AttachmentSchema } from './attachment.schema';
import { CreateAttachmentDto } from './create-attachment.dto';
import { Attachment } from './attachment.interface';

@Component()
export class AttachmentsService {

  constructor( @InjectModel(AttachmentSchema) private readonly attachmentModel: Model<Attachment>) { }

  async create(attachmentDto: Attachment): Promise<Attachment> {
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
