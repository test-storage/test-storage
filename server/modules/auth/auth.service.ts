import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Component, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { jwtSecret } from './passport/jwt.secret';

import { UserDto } from './dto/user.dto';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';

@Component()
export class AuthService {

  private authorizedUser: User;

  constructor(private usersService: UsersService) { }

  private async createToken() {
    const expiresIn = 60 * 60, secretOrKey = jwtSecret();
    const user = { email: this.authorizedUser.email };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    const refreshToken = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expiresIn: expiresIn,
      accessToken: token,
      refreshToken: refreshToken
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

  async getRefreshToken() {
    return await this.createToken();
  }

  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }

  async validateRefreshToken(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }

  async validateLogin(userDto: UserDto): Promise<boolean> {
    const existedUser = await this.usersService.findOneByUsername(userDto.username);

    if (existedUser) {
      const passwordIsMatch = await bcrypt.compareSync(userDto.password, existedUser.password);

      if (passwordIsMatch) {
        this.authorizedUser = existedUser;
        return true;
      } else {
        // TODO log('user password not match');
        // TODO invalid login attempts counter++
        return false;
      }
    } else {
      // TODO log('user not exist');
      // TODO invalid login attempts counter++
      return false;
    }
  }
}
