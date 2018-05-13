import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TestcaseSchema } from './testcase.schema';
import { CreateTestcaseDto } from './create-testcase.dto';
import { Testcase } from './testcase.interface';


@Injectable()
export class TestcasesService {

  constructor(@InjectModel('Testcase') private readonly testcaseModel: Model<Testcase>) { }

  async create(testcaseDto: CreateTestcaseDto): Promise<Testcase> {
    const createdTestcase = new this.testcaseModel(testcaseDto);
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

  async update(id: string, testcase: CreateTestcaseDto): Promise<Testcase> {
    return await this.testcaseModel.findOneAndUpdate({ '_id': id }, testcase).exec();
  }

  async delete(id: string): Promise<void> {
    return await this.testcaseModel.findOneAndRemove({ '_id': id }).exec();
  }
}
