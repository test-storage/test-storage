import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParameterValidationPipe } from '../common/pipes/parameter-validation.pipe';

import { UsersService } from './users.service';

import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create( @Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne( @Param('id', new ParameterValidationPipe()) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async findOneAndUpdate(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Param('id', new ParameterValidationPipe()) id: string) {
    return this.usersService.update(id, createUserDto);
  }

  @Delete(':id')
  async delete( @Param('id', new ParameterValidationPipe()) id: string) {
    return this.usersService.delete(id);
  }
}
