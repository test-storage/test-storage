import { Controller, Post, HttpStatus, HttpCode, HttpException, Body } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';

import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  public async login( @Body(new ValidationPipe()) userDto: UserDto) {
    return await this.authService.getAccessToken(userDto);
  }

  @HttpCode(200)
  @Post('refresh')
  public async refresh() {
    return await this.authService.getRefreshToken();
  }

}
