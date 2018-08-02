import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { RolesService } from './roles.service';

import { Role } from './role.interface';
import { CreateRoleDto } from './create-role.dto';

import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Roles')
@Controller('api/v1/roles')
export class RolesController {

  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @ApiOperation({ title: 'Create Role' })
  @ApiResponse({ status: 201, description: 'The role has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ title: 'Get All Roles' })
  @ApiResponse({ status: 200, description: 'The list of roles has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get Single Role by id' })
  @ApiResponse({ status: 200, description: 'The single role has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id', new ParameterValidationPipe()) id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update Single Role by id' })
  @ApiResponse({ status: 200, description: 'The single role has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOneAndUpdate(@Body(new ValidationPipe()) createRoleDto: CreateRoleDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.rolesService.update(id, createRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Delete Single Role by id' })
  @ApiResponse({ status: 200, description: 'The single role has been successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(@Param('id', new ParameterValidationPipe()) id: string) {
    return this.rolesService.delete(id);
  }
}
