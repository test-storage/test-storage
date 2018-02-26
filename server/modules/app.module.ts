import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CORSMiddleware } from './common/middlewares/cors.middleware';

import { TestcasesModule } from './testcases/testcases.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ProjectsModule } from './projects/projects.module';
import { TestsuitesModule } from './testsuites/testsuites.module';

@Module({
  imports: [
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
