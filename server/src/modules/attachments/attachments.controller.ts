import {
  Post, Get, Put, Delete, Param, Controller,
  UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { UserId } from '../common/decorators/user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from './../common/guards/roles.guard';

import { AttachmentsService } from './attachments.service';
import { Attachment } from './attachment.interface';

import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Attachments')
@Controller('api/v1/attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Post('upload')
  @ApiOperation({ description: 'Upload attachment to server' })
  @ApiResponse({ status: 201, description: 'The attachment has been successfully uploaded.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(FileInterceptor('filename', { dest: process.env.UPLOAD_DIR }))
  async uploadFile(@UploadedFile() file, @UserId(new ParameterValidationPipe()) userId) {
    return await this.attachmentsService.create(file, userId);
  }

  @Get()
  @ApiOperation({ description: 'Get All Attachments' })
  @ApiResponse({ status: 200, description: 'The list of attachments has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Attachment[]> {
    return this.attachmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Get Single Attachment by id' })
  @ApiResponse({ status: 200, description: 'The single attachment has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Attachment> {
    return this.attachmentsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('administrator')
  @ApiOperation({ description: 'Delete Single Attachment by id' })
  @ApiResponse({ status: 200, description: 'The single attachment has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.attachmentsService.delete(id);
  }

}



