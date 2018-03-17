import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';

import * as config from 'config';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CORSMiddleware } from './common/middlewares/cors.middleware';

import { TestcasesModule } from './testcases/testcases.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProjectsModule } from './projects/projects.module';
import { TestsuitesModule } from './testsuites/testsuites.module';

const connectionString = `mongodb://${config.get('db.user')}:${config.get('db.password')}@${config.get('db.host')}`;

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOLAB_URI || connectionString),
    AuthModule,
    ProjectsModule,
    TestcasesModule,
    TestsuitesModule,
    UsersModule,
    RolesModule
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(CORSMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
