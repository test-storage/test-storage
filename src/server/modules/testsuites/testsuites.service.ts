import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateTestsuiteDto } from './dto/create-testsuite.dto';

import { Testsuite } from './interfaces/testsuite.interface';
import { TestsuitesModule } from './testsuites.module';

@Component()
export class TestsuitesService {

  constructor( @Inject('TestsuiteModelToken') private readonly testsuiteModel: Model<Testsuite>) { }

  async create(testsuite: Testsuite): Promise<Testsuite> {
    const createdTestsuite = new this.testsuiteModel(testsuite);
    return await createdTestsuite.save();
  }

  async findAll(): Promise<Testsuite[]> {
    return await this.testsuiteModel.find().exec();
  }

  async findOne(id): Promise<Testsuite> {
    return await this.testsuiteModel.findOne({ '_id': id }).exec();
  }

  async update(id): Promise<Testsuite> {
    return await this.testsuiteModel.findOneAndUpdate({ '_id': id }).exec();
  }

  async delete(id): Promise<void> {
    return await this.testsuiteModel.findOneAndDelete({ '_id': id }).exec();
  }
}
