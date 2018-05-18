import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { DevicesService } from './devices.service';
import { Device } from './device.interface';
import { CreateDeviceDto } from './create-device.dto';

@ApiBearerAuth()
@ApiUseTags('Devices')
@Controller('api/v1/devices')
export class DevicesController {

  constructor(private readonly devicesService: DevicesService) { }

  @Post()
  @ApiOperation({ title: 'Create Device' })
  @ApiResponse({ status: 201, description: 'The device has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createDeviceDto: CreateDeviceDto): Promise<Device> {
    return await this.devicesService.create(createDeviceDto, userId);
  }

  @Get()
  @ApiOperation({ title: 'Get All Devices' })
  @ApiResponse({ status: 200, description: 'The list of devices has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Device by id' })
  @ApiResponse({ status: 200, description: 'The single device has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Device> {
    return this.devicesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Device by id' })
  @ApiResponse({ status: 200, description: 'The single device has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createDeviceDto: CreateDeviceDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return await this.devicesService.update(id, createDeviceDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Device by id' })
  @ApiResponse({ status: 200, description: 'The single device has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.devicesService.delete(id);
  }
}
