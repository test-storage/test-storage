import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { ProjectsService } from './projects.service';

import { Project } from './interfaces/project.interface';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiBearerAuth()
@ApiUseTags('projects')
@Controller('api/v1/projects')
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  @ApiOperation({ title: 'Create Project' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create( @Body(new ValidationPipe()) createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ title: 'Get All Projects' })
  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Project by id' })
  @ApiResponse({
    status: 200,
    description: 'The single record has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Project by id' })
  @ApiResponse({
    status: 200,
    description: 'The single record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.projectsService.update(id, createProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Project by id' })
  @ApiResponse({
    status: 200,
    description: 'The single record has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.projectsService.delete(id);
  }
}
