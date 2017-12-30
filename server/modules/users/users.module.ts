import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  modules: [DatabaseModule],
  controllers: [UsersController],
  components: [
    UsersService,
    ...usersProviders
  ],
  exports: [UsersService]
})
export class UsersModule { }
