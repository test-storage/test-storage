import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { genSalt, hash, compare } from 'bcrypt';
// import { User } from './user.interface';


export type UserDocument = User & Document;


@Schema()
export class User extends Document {

  @Prop({
    type: String,
    default(): string {
      return randomBytes(16).toString('hex');
    }
  })
  // tslint:disable-next-line:variable-name
  _id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  active: boolean;

  @Prop()
  photo?: string;

  @Prop()
  avatarColor?: number;

  @Prop()
  workInfo?: object;

  @Prop()
  social?: object;

  @Prop()
  role: string;

  @Prop()
  userGroups?: Array<string>;

  @Prop()
  projects?: Array<string>;

  @Prop()
  created?: Date;

  @Prop()
  updated?: Date;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
