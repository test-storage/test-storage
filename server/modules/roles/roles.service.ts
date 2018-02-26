import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './interfaces/role.interface';


@Component()
export class RolesService {

  constructor( @Inject('RoleModelToken') private readonly roleModel: Model<Role>) { }

  async create(role: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(role);
    return await createdRole.save((err, role) => {
      return role;
    });
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
    return await this.roleModel.findOneAndDelete({ '_id': id }).exec();
  }
}
