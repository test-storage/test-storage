import * as passport from 'passport';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy } from './passport/jwt.strategy';
import { UsersModule } from '../users/users.module';

import { AuthValidationService } from './auth-validation.service';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    JwtStrategy,
    AuthValidationService
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes('/api/v1/*');
  }
}
