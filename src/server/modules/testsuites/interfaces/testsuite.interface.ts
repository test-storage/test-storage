import { Document } from 'mongoose';

export interface Testsuite extends Document {
  readonly _id?: string;
  readonly parentId: string;
  readonly projectId: string;
  readonly status?: string;
  readonly name: string;
  readonly description: string;
  readonly created?: string;
  readonly updated?: string;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
