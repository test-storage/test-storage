import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestrunSchema } from './testrun.schema';

import { TestrunsController } from './testruns.controller';
import { TestrunsService } from './testruns.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Testrun', schema: TestrunSchema }])],
  controllers: [TestrunsController],
  providers: [
    TestrunsService
  ],
})
export class TestrunsModule { }
