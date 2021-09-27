import { Document } from 'mongoose';

export interface Testsuite extends Document {
  readonly _id: string;
  readonly parentId: string;
  readonly projectId: string;
  readonly status?: string;
  readonly name: string;
  readonly description?: string;
  readonly order?: number;
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
