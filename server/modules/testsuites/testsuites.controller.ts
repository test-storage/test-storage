import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { TestsuitesService } from './testsuites.service';

import { Testsuite } from './interfaces/testsuite.interface';
import { CreateTestsuiteDto } from './dto/create-testsuite.dto';

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
  async create( @Body(new ValidationPipe()) createTestsuiteDto: CreateTestsuiteDto) {
    this.testsuitesService.create(createTestsuiteDto);
  }

  @Get()
  async findAll(): Promise<Testsuite[]> {
    return this.testsuitesService.findAll();
  }

  @Get(':id')
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<Testsuite> {
    return this.testsuitesService.findOne(id);
  }

  @Put(':id')
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createTestsuiteDto: CreateTestsuiteDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testsuitesService.update(id, createTestsuiteDto);
  }

  @Delete(':id')
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.testsuitesService.delete(id);
  }
}
