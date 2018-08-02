import { Controller, Post, HttpCode, Body } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';

import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Authentication')
@Controller('authentication')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({ title: 'Create Authentication token' })
  @ApiResponse({ status: 200, description: 'The auth token has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async login(@Body(new ValidationPipe()) userDto: UserDto) {
    return await this.authService.getAccessToken(userDto);
  }

  @HttpCode(200)
  @Post('revoke')
  @ApiOperation({ title: 'Revoke Authentication token' })
  @ApiResponse({ status: 200, description: 'The auth token has been successfully revoked.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async revokeToken() {
    // TODO
  }

}
