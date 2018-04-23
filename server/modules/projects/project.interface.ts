import { Document } from 'mongoose';

export interface Project extends Document {
  readonly _id?: string;
  readonly name: string;
  readonly description: string;
  readonly enabled?: boolean;
  readonly created?: string;
  readonly updated?: string;
  // manager?: string; point to user
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
