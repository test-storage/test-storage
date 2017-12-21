import { Document } from 'mongoose';

export interface Testcase extends Document {
  readonly title: string;
  readonly description: string;
}
