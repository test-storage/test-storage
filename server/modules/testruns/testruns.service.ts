import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TestrunSchema } from './testrun.schema';
import { CreateTestrunDto } from './create-testrun.dto';
import { Testrun } from './testrun.interface';


@Injectable()
export class TestrunsService {

  constructor(@InjectModel('Testrun') private readonly testrunModel: Model<Testrun>) { }

  async create(testrunDto: CreateTestrunDto): Promise<Testrun> {
    const createdTestrun = new this.testrunModel(testrunDto);
    return await createdTestrun.save();
  }

  async findAll(): Promise<Testrun[]> {
    return await this.testrunModel.find().exec();
  }

  async findAllByProjectId(id: string): Promise<Testrun[]> {
    return await this.testrunModel.find().where('projectId', id).exec();
  }

  async findOne(id: string): Promise<Testrun> {
    return await this.testrunModel.findOne({ '_id': id }).exec();
  }

  async update(id: string, testrun: CreateTestrunDto): Promise<Testrun> {
    return await this.testrunModel.findOneAndUpdate({ '_id': id }, testrun).exec();
  }

  async delete(id: string): Promise<void> {
    return await this.testrunModel.findOneAndRemove({ '_id': id }).exec();
  }
}
