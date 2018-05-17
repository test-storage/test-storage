import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserSchema } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.interface';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async create(userDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userDto);
    const user = await createdUser.save();
    user.password = undefined;
    return user;
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
    return await this.userModel.findOne({ '_id': id }).exec(function (err, usr) {
      if (err) {
        console.log(err);
      }
      Object.assign(usr, user);
      return usr.save();
    });
  }

  async delete(id: string): Promise<void> {
    return await this.userModel.findOneAndRemove({ '_id': id }).select('-password').exec();
  }

  async findMe(id: string): Promise<User> {
    return await this.userModel.findOne({ '_id': id }).select('-password').exec();
  }
}
