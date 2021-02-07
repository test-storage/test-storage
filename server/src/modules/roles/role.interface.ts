import { Document } from 'mongoose';

export interface Role extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description?: string;
}
