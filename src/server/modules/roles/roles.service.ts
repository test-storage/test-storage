import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';

import { Role } from './interfaces/role.interface';
import { RolesModule } from './roles.module';

@Component()
export class RolesService {

  constructor( @Inject('RoleModelToken') private readonly roleModel: Model<Role>) { }

  async create(role: Role): Promise<Role> {
    const createdRole = new this.roleModel(role);
    return await createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.find().exec();
  }

  async findOne(id): Promise<Role> {
    return await this.roleModel.findOne({ '_id': id }).exec();
  }

  async update(id): Promise<Role> {
    return await this.roleModel.findOneAndUpdate({ '_id': id }).exec();
  }

  async delete(id): Promise<void> {
    return await this.roleModel.findOneAndDelete({ '_id': id }).exec();
  }
}
