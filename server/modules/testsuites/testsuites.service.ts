import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TestsuiteSchema } from './testsuite.schema';
import { CreateTestsuiteDto } from './create-testsuite.dto';
import { Testsuite } from './testsuite.interface';


@Component()
export class TestsuitesService {

  constructor( @InjectModel(TestsuiteSchema) private readonly testsuiteModel: Model<Testsuite>) { }

  async create(testsuiteDto: CreateTestsuiteDto): Promise<Testsuite> {
    const createdTestsuite = new this.testsuiteModel(testsuiteDto);
    return await createdTestsuite.save((err, testsuite) => {
      return testsuite;
    });
  }

  async findAll(): Promise<Testsuite[]> {
    return await this.testsuiteModel.find().exec();
  }

  async findOne(id: string): Promise<Testsuite> {
    return await this.testsuiteModel.findOne({ '_id': id }).exec();
  }

  async update(id: string, testsuite: CreateTestsuiteDto): Promise<Testsuite> {
    return await this.testsuiteModel.findOneAndUpdate({ '_id': id }, testsuite).exec();
  }

  async delete(id: string): Promise<void> {
    return await this.testsuiteModel.findOneAndDelete({ '_id': id }).exec();
  }
}
