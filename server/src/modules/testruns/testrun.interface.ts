import { Document } from 'mongoose';

export interface Testrun extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description?: string;
  readonly projectId: string;
  readonly builds?: Array<string>;
  readonly environments?: Array<string>;
  readonly platforms?: Array<string>;
  readonly testcases?: Array<string>;
  readonly status?: string;
  readonly progress?: number;
  readonly archieved?: boolean;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly created?: string;
  readonly updated?: string;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
