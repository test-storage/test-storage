import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { RolesService } from './roles.service';

import { Role } from './role.interface';
import { CreateRoleDto } from './create-role.dto';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Roles')
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
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  async findOneAndUpdate( @Body(new ValidationPipe()) createRoleDto: CreateRoleDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.rolesService.update(id, createRoleDto);
  }

  @Delete(':id')
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.rolesService.delete(id);
  }
}
