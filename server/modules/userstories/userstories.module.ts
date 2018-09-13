import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserStorySchema } from './userstory.schema';

import { UserStoriesController } from './userstories.controller';
import { UserStoriesService } from './userstories.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'UserStory', schema: UserStorySchema }])],
  controllers: [UserStoriesController],
  providers: [
    UserStoriesService
  ],
})
export class UserStoriesModule { }
