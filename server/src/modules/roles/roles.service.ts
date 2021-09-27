import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateRoleDto } from './create-role.dto';
import { Role } from './role.interface';


@Injectable()
export class RolesService {

  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) { }

  async create(roleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(roleDto);
    return await createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.find().exec();
  }

  async findOne(id: string): Promise<Role> {
    return await this.roleModel.findOne({ '_id': id }).exec();
  }

  async update(id: string, role: CreateRoleDto): Promise<Role> {
    return await this.roleModel.findOneAndUpdate({ '_id': id }, role).exec();
  }

  async delete(id: string): Promise<void> {
    await this.roleModel.findOneAndRemove({ '_id': id }).exec();
  }
}
