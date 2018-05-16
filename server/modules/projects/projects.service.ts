import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateProjectDto } from './create-project.dto';
import { ProjectSchema } from './project.schema';
import { Project } from './project.interface';

@Injectable()
export class ProjectsService {

  constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) { }

  async create(projectDto: CreateProjectDto): Promise<Project> {
    const createdProject = await new this.projectModel(projectDto);
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
    return await this.projectModel.findOneAndRemove({ '_id': id }).exec();
  }
}
