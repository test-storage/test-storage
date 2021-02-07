import { Document } from 'mongoose';

export interface Project extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  readonly avatarColor?: number;
  readonly enabled?: boolean;
  readonly created?: Date;
  readonly updated?: Date;
  // manager?: string; point to user
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
