import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

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
  findOne( @Param('id', new ParameterValidationPipe()) id): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  findOneAndUpdate( @Body(new ValidationPipe()) createRoleDto: CreateRoleDto,
    @Param('id', new ParameterValidationPipe()) id) {
    return this.rolesService.update(id, createRoleDto);
  }

  @Delete(':id')
  delete( @Param('id', new ParameterValidationPipe()) id) {
    return this.rolesService.delete(id);
  }
}
