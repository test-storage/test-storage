import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthValidationService } from '../auth-validation.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validationService: AuthValidationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validationService.validateUser(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
