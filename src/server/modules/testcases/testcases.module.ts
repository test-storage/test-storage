import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { testcasesProviders } from './testcases.providers';

import { TestcasesController } from './testcases.controller';
import { TestcasesService } from './testcases.service';

@Module({
  modules: [DatabaseModule],
  controllers: [TestcasesController],
  components: [
    TestcasesService,
    ...testcasesProviders
  ],
})
export class TestcasesModule { }
