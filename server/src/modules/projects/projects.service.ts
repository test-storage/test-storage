
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateProjectDto } from './create-project.dto';
import { Project } from './project.interface';

import { NotificationsService } from './../notifications/notifications.service';
import { Notification } from '../notifications/notification.interface';

@Injectable()
export class ProjectsService {

  constructor(
    private notifications: NotificationsService,
    @InjectModel('Project') private readonly projectModel: Model<Project>) { }

  async create(projectDto: CreateProjectDto, userId: string): Promise<Project> {
    const createdProject = await new this.projectModel({
      ...projectDto,
      avatarColor: Math.floor(Math.random() * 360),
      createdBy: userId
    });

    /*
    const notification: Notification = {
      entity: projectDto.name,
      action: 'CREATE',
      senderId: userId
    };
    this.notifications.create(notification, userId);
    */
    return await createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().exec();
  }

  async findOne(id): Promise<Project> {
    return await this.projectModel.findOne({ _id: id }).exec();
  }

  async update(id: string, project: CreateProjectDto, userId: string): Promise<Project> {
    const existedProject = await this.projectModel.findOne({ _id: id }).exec();
    if (existedProject) {
      Object.assign(existedProject, {
        ...project,
        updatedBy: userId,
        updated: new Date().toISOString()
      });
      return await existedProject.save();
    }
  }

  async delete(id): Promise<void> {
    await this.projectModel.findOneAndRemove({ _id: id }).exec();
  }
}
