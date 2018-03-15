import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestsuiteSchema } from './testsuite.schema';

import { TestsuitesController } from './testsuites.controller';
import { TestsuitesService } from './testsuites.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Testsuite', schema: TestsuiteSchema }])],
  controllers: [TestsuitesController],
  components: [
    TestsuitesService
  ],
})
export class TestsuitesModule { }
