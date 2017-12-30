import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateTestcaseDto } from './dto/create-testcase.dto';
import { Testcase } from './interfaces/testcase.interface';


@Component()
export class TestcasesService {

  constructor( @Inject('TestcaseModelToken') private readonly testcaseModel: Model<Testcase>) { }

  async create(testcase: CreateTestcaseDto): Promise<Testcase> {
    const createdTestcase = new this.testcaseModel(testcase);
    return await createdTestcase.save();
  }

  async findAll(): Promise<Testcase[]> {
    return await this.testcaseModel.find().exec();
  }

  async findOne(id): Promise<Testcase> {
    return await this.testcaseModel.findOne({ '_id': id }).exec();
  }

  async update(id, testcase: CreateTestcaseDto): Promise<Testcase> {
    return await this.testcaseModel.findOneAndUpdate({ '_id': id }, testcase).exec();
  }

  async delete(id): Promise<void> {
    return await this.testcaseModel.findOneAndDelete({ '_id': id }).exec();
  }
}
