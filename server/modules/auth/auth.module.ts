import * as passport from 'passport';
import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtRefreshStrategy } from './passport/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  components: [
    AuthService,
    JwtRefreshStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer
      .apply(passport.authenticate('jwtrefresh', { session: false }))
      .forRoutes({ path: '/authentication/refresh', method: RequestMethod.POST })
      .apply(passport.authenticate('jwt', { session: false }))
      .forRoutes({ path: '/api/v1/*', method: RequestMethod.ALL });
  }
}
