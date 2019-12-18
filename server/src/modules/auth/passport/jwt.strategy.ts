import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthValidationService } from '../auth-validation.service';
import { jwtSecret } from './jwt.secret';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly validationService: AuthValidationService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.SECRET || jwtSecret(),
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  public async verify(req, payload: JwtPayload, done: (err, response) => void) {
    const isValid = await this.validationService.validateUser(payload);
    if (!isValid) {
      return done('Unauthorized', false);
    }
    done(null, payload);
  }
}
