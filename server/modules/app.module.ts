import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import * as config from 'config';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CORSMiddleware } from './common/middlewares/cors.middleware';

import { TestcasesModule } from './testcases/testcases.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProjectsModule } from './projects/projects.module';
import { TestsuitesModule } from './testsuites/testsuites.module';
import { TestrunsModule } from './testruns/testruns.module';
import { DevicesModule } from './devices/devices.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { TestResultsModule } from './testresults/testresults.module';
import { NotificationsModule } from './notifications/notifications.module';

import { MongoDBConnectionStringBuilder } from './connection-string.builder';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOLAB_URI ||
      new MongoDBConnectionStringBuilder()
        .setUser(config.get('db.user'))
        .setPassword(config.get('db.password'))
        .setHost(config.get('db.host'))
        .setPort(config.get('db.port'))
        .setDatabaseName(config.get('db.name'))
        .build(), { useNewUrlParser: true }),
    AuthModule,
    ProjectsModule,
    TestcasesModule,
    TestsuitesModule,
    TestrunsModule,
    UsersModule,
    RolesModule,
    DevicesModule,
    AttachmentsModule,
    TestResultsModule,
    NotificationsModule
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CORSMiddleware)
      .forRoutes('/*');
  }
}
