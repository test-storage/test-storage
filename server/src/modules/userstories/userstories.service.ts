import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserStoryDto } from './create-userstory.dto';
import { UserStory } from './userstory.interface';


@Injectable()
export class UserStoriesService {

  constructor(@InjectModel('UserStory') private readonly userStoryModel: Model<UserStory>) { }

  async create(userstoryDto: CreateUserStoryDto, userId: string): Promise<UserStory> {
    const createdUserStory = new this.userStoryModel({ ...userstoryDto, createdBy: userId });
    return await createdUserStory.save();
  }

  async findAll(): Promise<UserStory[]> {
    return await this.userStoryModel.find().exec();
  }

  async findAllByTestSuiteId(id: string): Promise<UserStory[]> {
    return await this.userStoryModel.find().where('testSuiteId', id).exec();
  }

  async findAllByProjectId(id: string, status?: string): Promise<UserStory[]> {
    return await this.userStoryModel.find().where('projectId', id).where('status', status).exec();
  }

  async findOne(id: string): Promise<UserStory> {
    return await this.userStoryModel.findOne({ _id: id }).exec();
  }

  async update(id: string, userstory: CreateUserStoryDto, userId: string): Promise<UserStory> {
    const existedTestCase = await this.userStoryModel.findOne({ _id: id }).exec();
    if (existedTestCase) {
      Object.assign(existedTestCase, { ...userstory, updatedBy: userId, updated: new Date().toISOString() });
      return existedTestCase.save();
    }
  }

  async delete(id: string): Promise<void> {
    await this.userStoryModel.findOneAndRemove({ _id: id }).exec();
  }

  async bulkImport(userstories: CreateUserStoryDto[], userId: string): Promise<UserStory[]> {
    const createdUserStories: UserStory[] = [];
    userstories.forEach(userstory => {
      const createdUserStory = new this.userStoryModel({ ...userstory, createdBy: userId });
      createdUserStories.push(createdUserStory);
    });
    return this.userStoryModel.insertMany(createdUserStories);
  }

  async bulkExport(projectId?: string): Promise<UserStory[]> {
    if (projectId) {
      return this.findAllByProjectId(projectId);
    } else {
      return await this.userStoryModel.find().exec();
    }
  }
}
