import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoleSchema } from './role.schema';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
  controllers: [RolesController],
  components: [
    RolesService
  ],
})
export class RolesModule { }
