import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { TestcasesService } from './testcases.service';
import { Testcase } from './testcase.interface';
import { CreateTestcaseDto } from './create-testcase.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Testcases')
@Controller('api/v1/testcases')
export class TestcasesController {

  constructor(private readonly testcasesService: TestcasesService) { }

  @Post()
  @ApiOperation({ description: 'Create Test Case' })
  @ApiResponse({ status: 201, description: 'The test case has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto): Promise<Testcase> {
    return await this.testcasesService.create(createTestcaseDto, userId);
  }

  @Post('/import')
  @ApiOperation({ description: 'Test Case Import' })
  @ApiResponse({ status: 201, description: 'The bulk test cases has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async import(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto[]): Promise<Testcase[]> {
    return await this.testcasesService.bulkImport(createTestcaseDto, userId);
  }

  @Get()
  @ApiOperation({ description: 'Get All Test Cases' })
  @ApiResponse({ status: 200, description: 'The list of test cases has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'testSuiteId', description: 'filter test cases by test suite id', required: false })
  @ApiQuery({ name: 'projectId', description: 'filter test cases by project id', required: false })
  @ApiQuery({ name: 'status', description: 'filter test cases by status if project id specified', required: false })
  async findAll(
    @Query('testSuiteId', new QueryIdValidationPipe()) testsuiteId?: string,
    @Query('projectId', new QueryIdValidationPipe()) projectId?: string,
    @Query('status') status?: string // TODO validation based on statuses enum
  ): Promise<Testcase[]> {
    if (projectId) {
      if (status) {
        return this.testcasesService.findAllByProjectId(projectId, status);
      } else {
      return this.testcasesService.findAllByProjectId(projectId);
      }
    } else if (testsuiteId) {
      return this.testcasesService.findAllByTestSuiteId(testsuiteId);
    } else {
      return this.testcasesService.findAll();
    }
  }

  @Get('/export')
  @ApiOperation({ description: 'Test Case Export' })
  @ApiResponse({ status: 200, description: 'The export list of test cases has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'projectId', description: 'filter test cases by project id', required: false })
  async export(@Query('projectId', new QueryIdValidationPipe()) id?: string): Promise<Testcase[]> {
    if (!id) {
      return this.testcasesService.findAll();
    } else {
      return this.testcasesService.findAllByProjectId(id);
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Test Case id' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Testcase> {
    return this.testcasesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Test Case id' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createTestcaseDto: CreateTestcaseDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return await this.testcasesService.update(id, createTestcaseDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Single Test Case by id' })
  @ApiResponse({ status: 200, description: 'The single test case has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Test Case id' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.testcasesService.delete(id);
  }

}
