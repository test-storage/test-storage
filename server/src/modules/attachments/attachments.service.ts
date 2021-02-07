import * as fs from 'fs';

import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Attachment } from './attachment.interface';
import { MulterFileMetadata } from './multer.interface';

@Injectable()
export class AttachmentsService {

  constructor(@InjectModel('Attachment') private readonly attachmentModel: Model<Attachment>) { }

  async create(metadata: MulterFileMetadata, userId: string): Promise<Attachment> {
    const attachment = {
      name: metadata.originalname,
      mimeType: metadata.mimetype,
      size: metadata.size,
      fileName: metadata.filename,
      path: metadata.path,
    };
    const createdAttachment = new this.attachmentModel({
      ...attachment,
      createdBy: userId
    });
    return await createdAttachment.save();
  }

  async findAll(): Promise<Attachment[]> {
    return await this.attachmentModel.find().exec();
  }

  async findOne(id: string): Promise<Attachment> {
    return await this.attachmentModel.findOne({ '_id': id }).exec();
  }

  /*
  async update(id: string): Promise<Attachment> {
    return await this.attachmentModel.findOneAndUpdate({ '_id': id }).exec();
  }
  */

  async delete(id: string): Promise<void> {
    const fileMetadata: Attachment = await this.attachmentModel.findOne({ '_id': id }).exec();
    if (fileMetadata) {
      await fs.unlink(fileMetadata.path, (err) => {
        if (err) {
          throw new InternalServerErrorException('Error occured while trying to delete file from file system');
        }
      });
    }
    await this.attachmentModel.findOneAndRemove({ '_id': id }).exec();
  }
}
