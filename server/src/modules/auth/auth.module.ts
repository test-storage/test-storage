import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { jwtSecret } from './strategies/jwt.secret';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { AuthValidationService } from './auth-validation.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET || jwtSecret(),
      signOptions: { expiresIn: '1d' },
    }),],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthValidationService
  ],
  controllers: [AuthController],
})
export class AuthModule { }
