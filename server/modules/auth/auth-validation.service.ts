import * as bcrypt from 'bcrypt';

import { Injectable,  ForbiddenException } from '@nestjs/common';
import { JwtPayload } from './passport/jwt-payload.interface';

import { UserDto } from './user.dto';
import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthValidationService {

  constructor(private usersService: UsersService) { }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    const existedUser = await this.usersService.findOneByUsername(payload.email);
    if (existedUser) {
      return true;
    } else {
      return false;
    }
  }

  async validateLogin(user: UserDto): Promise<User> {
    const existedUser = await this.usersService.findOneByUsername(user.username);

    if (existedUser) {
      return await bcrypt.compare(user.password, existedUser.password).then(passwordIsMatch => {
        if (passwordIsMatch) {
          return this.isUserActivated(existedUser);
        } else {
          // TODO log('user password not match');
          // TODO invalid login attempts counter++
          return;
        }
      });
    } else {
      // TODO log('user not exist');
      // TODO invalid login attempts counter++
      return;
    }
  }

  isUserActivated(user) {
    if (user.active === true) {
      return user;
    } else {
      throw new ForbiddenException('User not activated');
    }
  }
}
