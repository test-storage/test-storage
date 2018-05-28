import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTestcaseDto } from './create-testcase.dto';
import { Testcase } from './testcase.interface';


@Injectable()
export class TestcasesService {

  constructor(@InjectModel('Testcase') private readonly testcaseModel: Model<Testcase>) { }

  async create(testcaseDto: CreateTestcaseDto, userId: string): Promise<Testcase> {
    const createdTestcase = new this.testcaseModel(testcaseDto);
    createdTestcase.createdBy = userId;
    return await createdTestcase.save();
  }

  async findAll(): Promise<Testcase[]> {
    return await this.testcaseModel.find().exec();
  }

  async findAllByTestSuiteId(id: string): Promise<Testcase[]> {
    return await this.testcaseModel.find().where('testSuiteId', id).exec();
  }

  async findOne(id: string): Promise<Testcase> {
    return await this.testcaseModel.findOne({ '_id': id }).exec();
  }

  async update(id: string, testcase: CreateTestcaseDto, userId: string): Promise<Testcase> {
    const existedTestCase = await this.testcaseModel.findOne({ '_id': id }).exec();
    if (existedTestCase) {
      Object.assign(existedTestCase, testcase);
      existedTestCase.updatedBy = userId;
      existedTestCase.updated = new Date().toISOString();
      return existedTestCase.save();
    }
  }

  async delete(id: string): Promise<void> {
    return await this.testcaseModel.findOneAndRemove({ '_id': id }).exec();
  }
}
