import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { rolesProviders } from './roles.providers';

import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  components: [
    RolesService,
    ...rolesProviders
  ],
})
export class RolesModule { }
