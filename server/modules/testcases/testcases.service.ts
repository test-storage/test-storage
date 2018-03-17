import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TestcaseSchema } from './testcase.schema';
import { CreateTestcaseDto } from './create-testcase.dto';
import { Testcase } from './testcase.interface';


@Component()
export class TestcasesService {

  constructor( @InjectModel(TestcaseSchema) private readonly testcaseModel: Model<Testcase>) { }

  async create(testcaseDto: CreateTestcaseDto): Promise<Testcase> {
    const createdTestcase = new this.testcaseModel(testcaseDto);
    return await createdTestcase.save((err, testcase) => {
      return testcase;
    });
  }

  async findAll(): Promise<Testcase[]> {
    return await this.testcaseModel.find().exec();
  }

  async findOne(id: string): Promise<Testcase> {
    return await this.testcaseModel.findOne({ '_id': id }).exec();
  }

  async update(id: string, testcase: CreateTestcaseDto): Promise<Testcase> {
    return await this.testcaseModel.findOneAndUpdate({ '_id': id }, testcase).exec();
  }

  async delete(id: string): Promise<void> {
    return await this.testcaseModel.findOneAndDelete({ '_id': id }).exec();
  }
}
