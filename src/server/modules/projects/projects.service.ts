import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateProjectDto } from './dto/create-project.dto';

import { Project } from './interfaces/project.interface';
import { ProjectsModule } from './projects.module';

@Component()
export class ProjectsService {

  constructor( @Inject('ProjectModelToken') private readonly projectModel: Model<Project>) { }

  async create(project: Project): Promise<Project> {
    const createdProject = new this.projectModel(project);
    return await createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().exec();
  }

  async findOne(id): Promise<Project> {
    return await this.projectModel.findOne({ '_id': id }).exec();
  }

  async update(id, project: Project): Promise<Project> {
    const createdOrUpdatedProject = new this.projectModel(project);
    return await this.projectModel.findOneAndUpdate({ '_id': id }, project).exec();
  }

  async delete(id): Promise<void> {
    return await this.projectModel.findOneAndDelete({ '_id': id }).exec();
  }
}
