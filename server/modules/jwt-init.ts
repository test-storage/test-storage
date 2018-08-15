import * as crypto from 'crypto';
import * as path from 'path';
import { writeFileSync } from 'fs';
import { jwtSecret } from './auth/passport/jwt.secret';

export function checkJWTSecret() {
  if (jwtSecret() === '') {
    return false;
  } else {
    return true;
  }
}

export function checkEnvSecret() {
  if (process.env.SECRET) {
    return true;
  } else {
    return false;
  }
}

export function generateJWTSecret() {
  const fileName = path.resolve(__dirname, './auth/passport/jwt.secret.ts');

  const key = crypto.randomBytes(256).toString('hex');

  const data = `export function jwtSecret() {
    return '${key}';
}
`;

  writeFileSync(fileName, data);
}
