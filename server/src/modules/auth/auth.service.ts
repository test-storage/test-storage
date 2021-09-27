import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './strategies/jwt-payload.interface';

import { UserDto } from './user.dto';
import { User } from '../users/user.interface';
import { AuthValidationService } from './auth-validation.service';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private rememberMe = false;

  constructor(private validationService: AuthValidationService, private jwtService: JwtService) { }

  async login(userDto: UserDto): Promise<{ accessToken: string }> {
    const validUser: User = await this.validationService.validateLogin(userDto);
    if (validUser) {
      // this.rememberMe = userDto.rememberMe;
      const user: JwtPayload = { email: validUser.email, userId: validUser._id, roles: [ validUser.role ] };
      return {
        accessToken: this.jwtService.sign(user)
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
