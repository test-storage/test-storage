import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { Component, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { jwtSecret } from './passport/jwt.secret';

import { UserDto } from './user.dto';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';

@Component()
export class AuthService {

  private authorizedUser: User;

  constructor(private usersService: UsersService) { }

  private async createToken() {
    const expiresIn = 60 * 60, secretOrKey = jwtSecret();
    const user = { email: this.authorizedUser.email };
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
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async validateUser(signedUser): Promise<boolean> {
    const existedUser = await this.usersService.findOneByUsername(signedUser.email);
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
          return true;
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

}
