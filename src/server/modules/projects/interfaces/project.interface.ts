import { Document } from 'mongoose';

export interface Project extends Document {
  readonly name: string;
  readonly description: string;
}
