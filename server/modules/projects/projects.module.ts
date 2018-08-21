import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectSchema } from './project.schema';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])],
  controllers: [ProjectsController],
  providers: [ProjectsService, NotificationsService],
})
export class ProjectsModule { }
