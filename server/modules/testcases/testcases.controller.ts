import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { TestcasesService } from './testcases.service';
import { Testcase } from './testcase.interface';
import { CreateTestcaseDto } from './create-testcase.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitParam
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
  async create(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto): Promise<Testcase> {
    return await this.testcasesService.create(createTestcaseDto, userId);
  }

  @Get()
  @ApiOperation({ title: 'Get All Test Cases' })
  @ApiResponse({ status: 200, description: 'The list of test cases has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitQuery({ name: 'testSuiteId', description: 'filter test cases by test suite id', required: false })
  async findAll(@Query('testSuiteId', new QueryIdValidationPipe()) id?: string): Promise<Testcase[]> {
    if (!id) {
      return this.testcasesService.findAll();
    } else {
      return this.testcasesService.findAllByTestSuiteId(id);
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Case id' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Testcase> {
    return this.testcasesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Case id' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return await this.testcasesService.update(id, createTestcaseDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Case id' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.testcasesService.delete(id);
  }
}
