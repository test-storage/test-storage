import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTestsuiteDto } from './create-testsuite.dto';
import { Testsuite } from './testsuite.interface';


@Injectable()
export class TestsuitesService {

  constructor(@InjectModel('Testsuite') private readonly testsuiteModel: Model<Testsuite>) { }

  async create(testsuiteDto: CreateTestsuiteDto, userId: string): Promise<Testsuite> {
    const createdTestsuite = new this.testsuiteModel({
      ...testsuiteDto,
      createdBy: userId
    });
    return await createdTestsuite.save();
  }

  async findAll(): Promise<Testsuite[]> {
    return await this.testsuiteModel.find().exec();
  }

  async findAllByProjectId(id: string): Promise<Testsuite[]> {
    return await this.testsuiteModel.find().where('projectId', id).exec();
  }

  async findOne(id: string): Promise<Testsuite> {
    return await this.testsuiteModel.findOne({ _id: id }).exec();
  }

  async update(id: string, testsuite: CreateTestsuiteDto, userId: string): Promise<Testsuite> {
    const existedTestSuite = await this.testsuiteModel.findOne({ _id: id }).exec();
    if (existedTestSuite) {
      Object.assign(existedTestSuite, {
        ...testsuite,
        updatedBy: userId,
        updated: new Date().toISOString()
      });
      return await existedTestSuite.save();
    }
  }

  async delete(id: string): Promise<void> {
    await this.testsuiteModel.findOneAndRemove({ _id: id }).exec();
  }
}
