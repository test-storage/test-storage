import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { projectsProviders } from './projects.providers';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  modules: [DatabaseModule],
  controllers: [ProjectsController],
  components: [
    ProjectsService,
    ...projectsProviders
  ],
})
export class ProjectsModule { }
