import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { TestResultsService } from './testresults.service';
import { TestResult } from './testresult.interface';
import { CreateTestResultDto } from './create-testresult.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('TestResults')
@Controller('api/v1/testresults')
export class TestResultsController {

  constructor(private readonly testresultsService: TestResultsService) { }

  @Post()
  @ApiOperation({ description: 'Create Test Result' })
  @ApiResponse({ status: 201, description: 'The test result has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createTestResultDto: CreateTestResultDto): Promise<TestResult> {
    return await this.testresultsService.create(createTestResultDto, userId);
  }

  @Get()
  @ApiOperation({ description: 'Get All Test Results' })
  @ApiResponse({ status: 200, description: 'The list of test results has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'projectId', description: 'filter test results by project id', required: false })
  @ApiQuery({ name: 'testrunId', description: 'filter test results by testrun id', required: false })
  async findAll(
    @Query('projectId', new QueryIdValidationPipe()) projectId?: string,
    @Query('testrunId', new QueryIdValidationPipe()) testrunId?: string): Promise<TestResult[]> {
    if (!projectId && !testrunId) {
      return this.testresultsService.findAll();
    } else if (projectId) {
      return this.testresultsService.findAllByProjectId(projectId);
    } else if (testrunId) {
      return this.testresultsService.findAllByTestrunId(testrunId);
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get Single Test Result by id' })
  @ApiResponse({ status: 200, description: 'The single test result has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Test Result id' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<TestResult> {
    return this.testresultsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update Single Test Result by id' })
  @ApiResponse({ status: 200, description: 'The single test result has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Test Result id' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createTestResultDto: CreateTestResultDto,
    @Param('id', new ParameterValidationPipe()) id: string): Promise<TestResult> {
    return await this.testresultsService.update(id, createTestResultDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Single Test Result by id' })
  @ApiResponse({ status: 200, description: 'The single test result has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'Test Result id' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string): Promise<void> {
    return this.testresultsService.delete(id);
  }
}
