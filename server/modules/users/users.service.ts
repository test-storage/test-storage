import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserSchema } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.interface';

@Component()
export class UsersService {

  constructor( @InjectModel(UserSchema) private readonly userModel: Model<User>) { }

  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return await createdUser.save((err, user) => {
      return user;
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ '_id': id }).exec();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ 'email': username }).exec();
  }

  async update(id: string, user: CreateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ '_id': id }, user).exec();
  }

  async delete(id: string): Promise<void> {
    return await this.userModel.findOneAndRemove({ '_id': id }).exec();
  }
}
