import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { testsuitesProviders } from './testsuites.providers';

import { TestsuitesController } from './testsuites.controller';
import { TestsuitesService } from './testsuites.service';

@Module({
  modules: [DatabaseModule],
  controllers: [TestsuitesController],
  components: [
    TestsuitesService,
    ...testsuitesProviders
  ],
})
export class TestsuitesModule { }
