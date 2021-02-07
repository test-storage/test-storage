import { Document } from 'mongoose';

export interface TestResult extends Document {
  readonly _id: string;
  readonly projectId: string;
  readonly testrunId: string;
  readonly testcaseId: string;
  readonly builds?: Array<string>;
  readonly platforms?: Array<string>;
  readonly status?: string;
  readonly notes?: string;
  readonly attachments?: Array<string>;
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
