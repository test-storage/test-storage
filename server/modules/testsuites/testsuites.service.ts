import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateTestsuiteDto } from './dto/create-testsuite.dto';
import { Testsuite } from './interfaces/testsuite.interface';


@Component()
export class TestsuitesService {

  constructor( @Inject('TestsuiteModelToken') private readonly testsuiteModel: Model<Testsuite>) { }

  async create(testsuite: CreateTestsuiteDto): Promise<Testsuite> {
    const createdTestsuite = new this.testsuiteModel(testsuite);
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
