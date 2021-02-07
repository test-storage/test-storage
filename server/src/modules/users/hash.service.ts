import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class HashService {

  async genSalt(): Promise<string> {
    return genSalt(10);
  }

  async getHash(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  async compareHash(password: string|undefined, passwordHash: string|undefined): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
