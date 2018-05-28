import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { jwtSecret } from './passport/jwt.secret';
import { JwtPayload } from './passport/jwt-payload.interface';

import { UserDto } from './user.dto';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  private authorizedUser: User;

  constructor(private usersService: UsersService) { }

  private async createToken() {
    const expiresIn = 600 * 600;
    const secretOrKey = jwtSecret();
    const user: JwtPayload = { email: this.authorizedUser.email, userId: this.authorizedUser._id, roles: [ this.authorizedUser.role ] };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expiresIn: expiresIn,
      accessToken: token
    };
  }

  async getAccessToken(userDto: UserDto) {
    const validUser = await this.validateLogin(userDto);
    if (validUser) {
      return await this.createToken();
    } else {
      throw new UnauthorizedException();
    }
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    const existedUser = await this.usersService.findOneByUsername(payload.email);
    if (existedUser) {
      return true;
    } else {
      return false;
    }
  }


  async validateLogin(user: UserDto): Promise<boolean> {
    const existedUser = await this.usersService.findOneByUsername(user.username);

    if (existedUser) {
      return await bcrypt.compare(user.password, existedUser.password).then(passwordIsMatch => {
        if (passwordIsMatch) {
          this.authorizedUser = existedUser;
          return this.isUserActivated(existedUser);
        } else {
          // TODO log('user password not match');
          // TODO invalid login attempts counter++
          return false;
        }
      });
    } else {
      // TODO log('user not exist');
      // TODO invalid login attempts counter++
      return false;
    }
  }

  isUserActivated(user) {
    if (user.active === true) {
      return true;
    } else {
      throw new ForbiddenException('User not activated');
    }
  }
}
