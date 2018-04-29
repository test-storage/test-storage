import { Model } from 'mongoose';
import { Component, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserSchema } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.interface';

@Component()
export class UsersService {

  constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) { }

  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return await createdUser.save((err, user) => {
      if (err) {
        console.log(err);
        throw new HttpException('Database error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return user;
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ '_id': id }).select('-password').exec();
  }

  async findOneByUsername(username: string): Promise<User> {
    // only use for AUTH purposes
    return await this.userModel.findOne({ 'email': username }).exec();
  }

  async update(id: string, user: CreateUserDto): Promise<User> {
    // TODO check update password
    return await this.userModel.findOneAndUpdate({ '_id': id }, user).select('-password').exec();
  }

  async delete(id: string): Promise<void> {
    return await this.userModel.findOneAndRemove({ '_id': id }).select('-password').exec();
  }

  async findMe(email: string): Promise<User> {
    // TODO get user id from token
    return await this.userModel.findOne({ 'email': email }).select('-password').exec();
  }
}
