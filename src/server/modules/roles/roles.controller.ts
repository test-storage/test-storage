import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

import { RolesService } from './roles.service';
import { Role } from './interfaces/role.interface';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('api/v1/roles')
export class RolesController {

  constructor(private readonly rolesService: RolesService) { }

  @Post()
  async create( @Body() createRoleDto: CreateRoleDto) {
    this.rolesService.create(createRoleDto);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne( @Param('id', new ParseIntPipe()) id): Promise<Role> {
    // logic
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  findOneAndUpdate( @Param('id', new ParseIntPipe()) id) {
    // logic
  }

  @Delete(':id')
  delete( @Param('id', new ParseIntPipe()) id) {
    // logic
  }
}
