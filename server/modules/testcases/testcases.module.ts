import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestcaseSchema } from './testcase.schema';

import { TestcasesController } from './testcases.controller';
import { TestcasesService } from './testcases.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Testcase', schema: TestcaseSchema }])],
  controllers: [TestcasesController],
  components: [
    TestcasesService
  ],
})
export class TestcasesModule { }
