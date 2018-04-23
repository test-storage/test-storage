import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { TestsuitesService } from './testsuites.service';

import { Testsuite } from './testsuite.interface';
import { CreateTestsuiteDto } from './create-testsuite.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Testsuites')
@Controller('api/v1/testsuites')
export class TestsuitesController {

  constructor(private readonly testsuitesService: TestsuitesService) { }

  @Post()
  @ApiOperation({ title: 'Create Test Suite' })
  @ApiResponse({ status: 201, description: 'The test suite has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create( @Body(new ValidationPipe()) createTestsuiteDto: CreateTestsuiteDto) {
    this.testsuitesService.create(createTestsuiteDto);
  }

  @Get()
  @ApiOperation({ title: 'Get All Test Suites' })
  @ApiResponse({ status: 200, description: 'The list of test suites has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Testsuite[]> {
    return this.testsuitesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Test Suite by id' })
  @ApiResponse({ status: 200, description: 'The single test suite has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<Testsuite> {
    return this.testsuitesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Test Suite by id' })
  @ApiResponse({ status: 200, description: 'The single test suite has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createTestsuiteDto: CreateTestsuiteDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testsuitesService.update(id, createTestsuiteDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Test Suite by id' })
  @ApiResponse({ status: 200, description: 'The single test suite has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testsuitesService.delete(id);
  }
}
