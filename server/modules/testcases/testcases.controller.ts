import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { TestcasesService } from './testcases.service';

import { Testcase } from './testcase.interface';
import { CreateTestcaseDto } from './create-testcase.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Testcases')
@Controller('api/v1/testcases')
export class TestcasesController {

  constructor(private readonly testcasesService: TestcasesService) { }

  @Post()
  @ApiOperation({ title: 'Create Test Case' })
  @ApiResponse({ status: 201, description: 'The test case has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create( @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto) {
    this.testcasesService.create(createTestcaseDto);
  }

  @Get()
  @ApiOperation({ title: 'Get All Test Suites by Test Suite id' })
  @ApiResponse({ status: 200, description: 'The list of test cates by test suite id has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findByTestSuiteId(@Query('testSuiteId', new ParameterValidationPipe()) id: string): Promise<Testcase[]> {
    return this.testcasesService.findAllByTestSuiteId(id);
  }

  @Get()
  @ApiOperation({ title: 'Get All Test Cases' })
  @ApiResponse({ status: 200, description: 'The list of test cases has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Testcase[]> {
    return this.testcasesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<Testcase> {
    return this.testcasesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testcasesService.update(id, createTestcaseDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testcasesService.delete(id);
  }
}
