import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { ValidationPipe } from '../common/pipes/validation.pipe';

import { TestcasesService } from './testcases.service';
import { Testcase } from './interfaces/testcase.interface';
import { CreateTestcaseDto } from './dto/create-testcase.dto';

@Controller('api/v1/testcases')
export class TestcasesController {

  constructor(private readonly testcasesService: TestcasesService) { }

  @Post()
  async create( @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto) {
    this.testcasesService.create(createTestcaseDto);
  }

  @Get()
  async findAll(): Promise<Testcase[]> {
    return this.testcasesService.findAll();
  }

  @Get(':id')
  findOne( @Param('id', new ParseIntPipe()) id): Promise<Testcase> {
    // logic
    return this.testcasesService.findOne(id);
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
