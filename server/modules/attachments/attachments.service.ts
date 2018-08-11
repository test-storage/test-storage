import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Attachment } from './attachment.interface';
import { MulterFileMetadata } from './multer.interface';

@Injectable()
export class AttachmentsService {

  constructor(@InjectModel('Attachment') private readonly attachmentModel: Model<Attachment>) { }

  async create(metadata: MulterFileMetadata, userId: string): Promise<Attachment> {
    const attachment: Attachment = {
      name: metadata.originalname,
      mimeType: metadata.mimetype,
      size: metadata.size,
      fileName: metadata.filename,
      path: metadata.path,
    };
    const createdAttachment = new this.attachmentModel(attachment);
    createdAttachment.createdBy = userId;
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
    // TODO remove file from file system
    return await this.attachmentModel.findOneAndRemove({ '_id': id }).exec();
  }
}
