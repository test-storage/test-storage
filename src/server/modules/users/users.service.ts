import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Component()
export class UsersService {

  constructor( @Inject('UserModelToken') private readonly userModel: Model<User>) { }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id): Promise<User> {
    return await this.userModel.findOne({ '_id': id }).exec();
  }

  async findOneByUsername(username): Promise<User> {
    return await this.userModel.findOne({ 'email': username }).exec();
  }

  async update(id): Promise<User> {
    return await this.userModel.findOneAndUpdate({ '_id': id }).exec();
  }

  async delete(id): Promise<void> {
    return await this.userModel.findOneAndDelete({ '_id': id }).exec();
  }
}
