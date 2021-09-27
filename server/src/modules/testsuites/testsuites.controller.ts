import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { TestsuitesService } from './testsuites.service';
import { Testsuite } from './testsuite.interface';
import { CreateTestsuiteDto } from './create-testsuite.dto';

import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Testsuites')
@Controller('api/v1/testsuites')
export class TestsuitesController {

  constructor(private readonly testsuitesService: TestsuitesService) { }

  @Post()
  @ApiOperation({ description: 'Create Test Suite' })
  @ApiResponse({ status: 201, description: 'The test suite has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createTestsuiteDto: CreateTestsuiteDto): Promise<Testsuite> {
    return await this.testsuitesService.create(createTestsuiteDto, userId);
  }

  @Get()
  @ApiOperation({ description: 'Get All Test Suites' })
  @ApiResponse({ status: 200, description: 'The list of test suites has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Query('projectId', new QueryIdValidationPipe()) id?: string): Promise<Testsuite[]> {
    if (!id) {
      return this.testsuitesService.findAll();
    } else {
      return this.testsuitesService.findAllByProjectId(id);
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get Single Test Suite by id' })
  @ApiResponse({ status: 200, description: 'The single test suite has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Testsuite> {
    return this.testsuitesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update Single Test Suite by id' })
  @ApiResponse({ status: 200, description: 'The single test suite has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createTestsuiteDto: CreateTestsuiteDto,
    @Param('id', new ParameterValidationPipe()) id: string): Promise<Testsuite> {
    return await this.testsuitesService.update(id, createTestsuiteDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Single Test Suite by id' })
  @ApiResponse({ status: 200, description: 'The single test suite has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string): Promise<void> {
    return this.testsuitesService.delete(id);
  }
}
