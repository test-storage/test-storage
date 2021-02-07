import { Get, Post, Put, Delete, Controller, Body, Param, Query } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { QueryIdValidationPipe } from '../common/pipes/query-id-validation.pipe';

import { UserId } from '../common/decorators/user.decorator';

import { UserStoriesService } from './userstories.service';
import { UserStory } from './userstory.interface';
import { CreateUserStoryDto } from './create-userstory.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiQuery,
  ApiParam
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User Stories')
@Controller('api/v1/userstories')
export class UserStoriesController {

  constructor(private readonly userStoriesService: UserStoriesService) { }

  @Post()
  @ApiOperation({ description: 'Create User Story' })
  @ApiResponse({ status: 201, description: 'The user story has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createUserStoryDto: CreateUserStoryDto): Promise<UserStory> {
    return await this.userStoriesService.create(createUserStoryDto, userId);
  }

  @Post('/import')
  @ApiOperation({ description: 'User Story Import' })
  @ApiResponse({ status: 201, description: 'The bulk user stories has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async import(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createUserStoryDto: CreateUserStoryDto[]): Promise<UserStory[]> {
    return await this.userStoriesService.bulkImport(createUserStoryDto, userId);
  }

  @Get()
  @ApiOperation({ description: 'Get All User Storys' })
  @ApiResponse({ status: 200, description: 'The list of user stories has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'testSuiteId', description: 'filter user stories by test suite id', required: false })
  @ApiQuery({ name: 'projectId', description: 'filter user stories by project id', required: false })
  @ApiQuery({ name: 'status', description: 'filter user stories by status if project id specified', required: false })
  async findAll(
    @Query('testSuiteId', new QueryIdValidationPipe()) testsuiteId?: string,
    @Query('projectId', new QueryIdValidationPipe()) projectId?: string,
    @Query('status') status?: string // TODO validation based on statuses enum
  ): Promise<UserStory[]> {
    if (projectId) {
      if (status) {
        return this.userStoriesService.findAllByProjectId(projectId, status);
      } else {
      return this.userStoriesService.findAllByProjectId(projectId);
      }
    } else if (testsuiteId) {
      return this.userStoriesService.findAllByTestSuiteId(testsuiteId);
    } else {
      return this.userStoriesService.findAll();
    }
  }

  @Get('/export')
  @ApiOperation({ description: 'User Story Export' })
  @ApiResponse({ status: 200, description: 'The export list of user stories has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'projectId', description: 'filter user stories by project id', required: false })
  async export(@Query('projectId', new QueryIdValidationPipe()) id?: string): Promise<UserStory[]> {
    if (!id) {
      return this.userStoriesService.findAll();
    } else {
      return this.userStoriesService.findAllByProjectId(id);
    }
  }

  @Get(':id')
  @ApiOperation({ description: 'Get Single User Story by id' })
  @ApiResponse({ status: 200, description: 'The single user story has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'User Story id' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<UserStory> {
    return this.userStoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update Single User Story by id' })
  @ApiResponse({ status: 200, description: 'The single user story has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'User Story id' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe()) userId,
    @Body(new ValidationPipe()) createUserStoryDto: CreateUserStoryDto,
    @Param('id', new ParameterValidationPipe()) id: string): Promise<UserStory> {
    return await this.userStoriesService.update(id, createUserStoryDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete Single User Story by id' })
  @ApiResponse({ status: 200, description: 'The single user story has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({ name: 'id', description: 'User Story id' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string): Promise<void> {
    return this.userStoriesService.delete(id);
  }

}
