import { Get, Post, Put, Delete, Controller, Body, Param } from '@nestjs/common';

import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { ValidationPipe } from '../common/pipes/validation.pipe';

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
  findOne( @Param('id', new ParseIntPipe()) id): Promise<User> {
    // logic
    return this.usersService.findOne(id);
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
