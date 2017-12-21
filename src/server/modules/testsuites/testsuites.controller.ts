import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { ValidationPipe } from '../common/pipes/validation.pipe';

import { TestsuitesService } from './testsuites.service';
import { Testsuite } from './interfaces/testsuite.interface';
import { CreateTestsuiteDto } from './dto/create-testsuite.dto';

@Controller('api/v1/testsuites')
export class TestsuitesController {

  constructor(private readonly testsuitesService: TestsuitesService) { }

  @Post()
  async create( @Body(new ValidationPipe()) createTestsuiteDto: CreateTestsuiteDto) {
    this.testsuitesService.create(createTestsuiteDto);
  }

  @Get()
  async findAll(): Promise<Testsuite[]> {
    return this.testsuitesService.findAll();
  }

  @Get(':id')
  findOne( @Param('id', new ParseIntPipe()) id): Promise<Testsuite> {
    // logic
    return this.testsuitesService.findOne(id);
  }

  @Put(':id')
  findOneAndUpdate( @Param('id', new ParseIntPipe()) id) {
    // logic
  }

  @Delete(':id')
  delete( @Param('id', new ParseIntPipe()) id) {
    // logic
  }
}
