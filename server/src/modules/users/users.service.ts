import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';

import { CreateUserDto } from './create-user.dto';
import { User } from './user.interface';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(userDto: CreateUserDto, userId: string): Promise<User> {
    const createdUser = new this.userModel({
      ...userDto,
      avatarColor: Math.floor(Math.random() * 360),
      createdBy: userId });
    const user = await createdUser.save();

    // TODO remove pass
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).select('-password').exec();
  }

  async findOneByUsername(username: string): Promise<User> {
    // only use for AUTH purposes
    return await this.userModel.findOne({ email: username }).exec();
  }

  async update(id: string, user: CreateUserDto, userId: string): Promise<User> {
    // TODO check update password
    const usr = await this.userModel.findOne({ _id: id }).exec();

    if (usr) {
      Object.assign(usr, {
        ...user,
        updatedBy: userId,
        updated: new Date().toISOString()
      });
      await usr.save();
      // usr.password = undefined;
      return usr;
    }

  }

  async delete(id: string): Promise<void> {
    await this.userModel.findOneAndRemove({ _id: id }).select('-password').exec();
  }

  async findMe(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).select('-password').exec();
  }

}
