import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id?: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly photo?: string;
  readonly workInfo?: any;
  readonly social?: any;
  readonly userGroups?: Array<string>;
  readonly projects?: Array<string>;
  readonly created?: string;
  readonly updated?: string;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
