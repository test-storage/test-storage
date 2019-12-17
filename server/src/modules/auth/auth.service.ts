import * as jwt from 'jsonwebtoken';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtSecret } from './passport/jwt.secret';
import { JwtPayload } from './passport/jwt-payload.interface';

import { UserDto } from './user.dto';
import { User } from '../users/user.interface';
import { AuthValidationService } from './auth-validation.service';

@Injectable()
export class AuthService {

  private rememberMe = false;

  constructor(private validationService: AuthValidationService) { }

  private async createToken(validUser) {
    let expiresIn = 24 * 3600; // 1 day
    if (this.rememberMe === true) {
      expiresIn = 7 * 24 * 3600; // 1 week
    }
    const secretOrKey = process.env.SECRET || jwtSecret();
    const user: JwtPayload = { email: validUser.email, userId: validUser._id, roles: [ validUser.role ] };
    const token: string = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expiresIn,
      accessToken: token
    };
  }

  async getAccessToken(userDto: UserDto) {
    const validUser: User = await this.validationService.validateLogin(userDto);
    if (validUser) {
      this.rememberMe = userDto.rememberMe;
      return await this.createToken(validUser);
    } else {
      throw new UnauthorizedException();
    }
  }
}
