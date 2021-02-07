import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTestrunDto } from './create-testrun.dto';
import { Testrun } from './testrun.interface';


@Injectable()
export class TestrunsService {

  constructor(@InjectModel('Testrun') private readonly testrunModel: Model<Testrun>) { }

  async create(testrunDto: CreateTestrunDto, userId: string): Promise<Testrun> {
    const createdTestrun = new this.testrunModel({
      ...testrunDto,
      createdBy: userId
    });
    return await createdTestrun.save();
  }

  async findAll(): Promise<Testrun[]> {
    return await this.testrunModel.find().exec();
  }

  async findAllByProjectId(id: string): Promise<Testrun[]> {
    return await this.testrunModel.find().where('projectId', id).exec();
  }

  async findOne(id: string): Promise<Testrun> {
    return await this.testrunModel.findOne({ _id: id }).exec();
  }

  async update(id: string, testrun: CreateTestrunDto, userId: string): Promise<Testrun> {
    const existedTestRun = await this.testrunModel.findOne({ _id: id }).exec();
    if (existedTestRun) {
      Object.assign(existedTestRun, {
        ...testrun,
        updatedBy: userId,
        updated: new Date().toISOString()
      });
      return existedTestRun.save();
    }
  }

  async delete(id: string): Promise<void> {
    await this.testrunModel.findOneAndRemove({ _id: id }).exec();
  }
}
