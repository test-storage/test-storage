import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateTestcaseDto } from './dto/create-testcase.dto';

import { Testcase } from './interfaces/testcase.interface';
import { TestcasesModule } from './testcases.module';

@Component()
export class TestcasesService {

  constructor( @Inject('TestcaseModelToken') private readonly testcaseModel: Model<Testcase>) { }

  async create(testcase: Testcase): Promise<Testcase> {
    const createdTestcase = new this.testcaseModel(testcase);
    return await createdTestcase.save();
  }

  async findAll(): Promise<Testcase[]> {
    return await this.testcaseModel.find().exec();
  }

  async findOne(id): Promise<Testcase> {
    return await this.testcaseModel.findOne({ '_id': id }).exec();
  }

  async update(id, testcase: Testcase): Promise<Testcase> {
    return await this.testcaseModel.findOneAndUpdate({ '_id': id }).exec();
  }

  async delete(id): Promise<void> {
    return await this.testcaseModel.findOneAndDelete({ '_id': id }).exec();
  }
}
