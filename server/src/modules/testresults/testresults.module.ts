import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestResultSchema } from './testresult.schema';

import { TestResultsController } from './testresults.controller';
import { TestResultsService } from './testresults.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'TestResult', schema: TestResultSchema }])],
  controllers: [TestResultsController],
  providers: [
    TestResultsService
  ],
})
export class TestResultsModule { }
