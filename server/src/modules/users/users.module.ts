import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashService } from './hash.service';

import { UserSchema, UserDocument, User } from './user.schema';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: 'User',
      useFactory: (hashService: HashService) => {
        const schema = UserSchema;
        schema.pre('save', async function hashPassword(next): Promise<any> {
          try {
            const user = this as UserDocument;

            // only hash the password if it has been modified (or is new)
            if (!user.isModified('password'))  {
              return next();
            }
            // generate a salt
            const salt = await hashService.genSalt();

            // hash the password along with our new salt
            const hash = await hashService.getHash(user.password, salt);

            // override the cleartext password with the hashed one
            user.password = hash;
            return next();
          } catch (e) {
            return next(e);
          }
        });
        return schema;
      },
    }
  ])],
  controllers: [UsersController],
  providers: [
    UsersService, HashService
  ],
  exports: [UsersService]
})
export class UsersModule { }
