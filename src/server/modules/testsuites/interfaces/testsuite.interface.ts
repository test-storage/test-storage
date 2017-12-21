import { Document } from 'mongoose';

export interface Testsuite extends Document {
  readonly title: string;
  readonly description: string;
}
