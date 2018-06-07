import { Get, Post, Put, Delete, Controller, Body, Param, UseGuards } from '@nestjs/common';

import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from './../common/guards/roles.guard';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';
import { UserId } from '../common/decorators/user.decorator';

import { ProjectsService } from './projects.service';

import { Project } from './project.interface';
import { CreateProjectDto } from './create-project.dto';

@ApiBearerAuth()
@ApiUseTags('Projects')
@Controller('api/v1/projects')
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  @ApiOperation({ title: 'Create Project' })
  @ApiResponse({ status: 201, description: 'The project has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto
  ): Promise<Project> {
    return await this.projectsService.create(createProjectDto, userId);
  }

  @Get()
  @ApiOperation({ title: 'Get All Projects' })
  @ApiResponse({ status: 200, description: 'The list of projects has been successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Project by id' })
  @ApiResponse({ status: 200, description: 'The single project has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Project by id' })
  @ApiResponse({ status: 200, description: 'The single project has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @UserId(new ParameterValidationPipe) userId,
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto,
    @Param('id', new ParameterValidationPipe()) id: string): Promise<Project> {
    return await this.projectsService.update(id, createProjectDto, userId);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('administrator')
  @ApiOperation({ title: 'Delete Single Project by id' })
  @ApiResponse({ status: 200, description: 'The single project has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.projectsService.delete(id);
  }
}
