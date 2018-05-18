import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { TestrunsService } from './testruns.service';
import { Testrun } from './testrun.interface';
import { CreateTestrunDto } from './create-testrun.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitParam
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Testruns')
@Controller('api/v1/testruns')
export class TestrunsController {

  constructor(private readonly testrunsService: TestrunsService) { }

  @Post()
  @ApiOperation({ title: 'Create Test Run' })
  @ApiResponse({ status: 201, description: 'The test run has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createTestrunDto: CreateTestrunDto): Promise<Testrun> {
    return await this.testrunsService.create(createTestrunDto, userId);
  }

  @Get()
  @ApiOperation({ title: 'Get All Test Runs' })
  @ApiResponse({ status: 200, description: 'The list of test runs has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitQuery({ name: 'projectId', description: 'filter test runs by project id', required: false })
  async findAll(@Query('projectId', new QueryIdValidationPipe()) id?: string): Promise<Testrun[]> {
    if (!id) {
      return this.testrunsService.findAll();
    } else {
      return this.testrunsService.findAllByProjectId(id);
    }
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Test Run by id' })
  @ApiResponse({ status: 200, description: 'The single test run has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Run id' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Testrun> {
    return this.testrunsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Test Run by id' })
  @ApiResponse({ status: 200, description: 'The single test run has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Run id' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createTestrunDto: CreateTestrunDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return await this.testrunsService.update(id, createTestrunDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Test Run by id' })
  @ApiResponse({ status: 200, description: 'The single test run has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiImplicitParam({ name: 'id', description: 'Test Run id' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.testrunsService.delete(id);
  }
}
