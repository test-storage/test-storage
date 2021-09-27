import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { NotificationsService } from './notifications.service';
import { Notification } from './notification.interface';
import { CreateNotificationDto } from './create-notification.dto';

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('api/v1/notifications')
export class NotificationsController {

  constructor(private readonly notificationsService: NotificationsService) { }

  @Post()
  @ApiOperation({ description: 'Create Notification' })
  @ApiResponse({ status: 201, description: 'The notification has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return await this.notificationsService.create(createNotificationDto, userId);
  }

  @Get()
  @ApiOperation({ description: 'Get All Notifications' })
  @ApiResponse({ status: 200, description: 'The list of notifications has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'recipientId', description: 'filter notifications by recipient id', required: false })
  async findAll(@Query('recipientId', new QueryIdValidationPipe()) id?: string): Promise<Notification[]> {
    if (!id) {
      return this.notificationsService.findAll();
    } else {
      return this.notificationsService.findAllByRecipientId(id);
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get Single Notification by id' })
  @ApiResponse({ status: 200, description: 'The single notification has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Notification> {
    return this.notificationsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update Single Notification by id' })
  @ApiResponse({ status: 200, description: 'The single notification has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createNotificationDto: CreateNotificationDto,
    @Param('id', new ParameterValidationPipe()) id: string): Promise<Notification> {
    return await this.notificationsService.update(id, createNotificationDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Single Notification by id' })
  @ApiResponse({ status: 200, description: 'The single notification has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.notificationsService.delete(id);
  }
}
