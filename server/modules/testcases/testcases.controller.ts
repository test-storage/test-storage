import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

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
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<Testcase> {
    return this.testcasesService.findOne(id);
  }

  @Put(':id')
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testcasesService.update(id, createTestcaseDto);
  }

  @Delete(':id')
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testcasesService.delete(id);
  }
}
