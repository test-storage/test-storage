import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTestResultDto } from './create-testresult.dto';
import { TestResult } from './testresult.interface';


@Injectable()
export class TestResultsService {

  constructor(@InjectModel('TestResult') private readonly testresultModel: Model<TestResult>) { }

  async create(testresultDto: CreateTestResultDto, userId: string): Promise<TestResult> {
    const createdTestResult = new this.testresultModel({
      ...testresultDto,
      createdBy: userId
    });
    return await createdTestResult.save();
  }

  async findAll(): Promise<TestResult[]> {
    return await this.testresultModel.find().exec();
  }

  async findAllByProjectId(id: string): Promise<TestResult[]> {
    return await this.testresultModel.find().where('projectId', id).exec();
  }

  async findAllByTestrunId(id: string): Promise<TestResult[]> {
    return await this.testresultModel.find().where('testrunId', id).exec();
  }

  async findOne(id: string): Promise<TestResult> {
    return await this.testresultModel.findOne({ _id: id }).exec();
  }

  async update(id: string, testresult: CreateTestResultDto, userId: string): Promise<TestResult> {
    const existedTestRun = await this.testresultModel.findOne({ _id: id }).exec();
    if (existedTestRun) {
      Object.assign(existedTestRun, {
        ...testresult,
        updatedBy: userId,
        updated: new Date().toISOString()
      });
      return existedTestRun.save();
    }
  }

  async delete(id: string): Promise<void> {
    await this.testresultModel.findOneAndRemove({ _id: id }).exec();
  }
}
