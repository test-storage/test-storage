import { Controller, Post, HttpCode, Body, UseGuards } from '@nestjs/common';

import { ValidationPipe } from '../common/pipes/validation.pipe';

import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('authentication')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ description: 'Create Authentication token' })
  @ApiResponse({ status: 200, description: 'The auth token has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async login(@Body(new ValidationPipe()) userDto: UserDto): Promise<any> {
    return await this.authService.login(userDto);
  }

  @HttpCode(200)
  @Post('revoke')
  @ApiOperation({ description: 'Revoke Authentication token' })
  @ApiResponse({ status: 200, description: 'The auth token has been successfully revoked.' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async revokeToken() {
    // TODO
  }

}
