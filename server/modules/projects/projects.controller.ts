import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { ProjectsService } from './projects.service';

import { Project } from './interfaces/project.interface';
import { CreateProjectDto } from './dto/create-project.dto';


@Controller('api/v1/projects')
export class ProjectsController {

  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  async create( @Body(new ValidationPipe()) createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createProjectDto: CreateProjectDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.projectsService.update(id, createProjectDto);
  }

  @Delete(':id')
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.projectsService.delete(id);
  }
}
