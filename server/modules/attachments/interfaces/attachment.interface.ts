import { Document } from 'mongoose';

export interface Attachment extends Document {
  readonly name: string;
  readonly description: string;
}
