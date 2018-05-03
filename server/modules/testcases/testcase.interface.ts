import { Document } from 'mongoose';

export interface Testcase extends Document {
  readonly _id?: string;
  readonly key?: string;
  readonly projectId: string;
  readonly testSuiteId: string;
  readonly priority?: number;
  readonly order?: number;
  readonly title: string;
  readonly description?: string;
  readonly preConditions?: string;
  readonly steps?: Array<string>;
  readonly postConditions?: string;
  readonly tags?: Array<string>;
  readonly created?: string;
  readonly updated?: string;
  readonly createdBy?: string;
  readonly updatedBy?: string;
  readonly enabled?: boolean;
  readonly isAutomated?: boolean;
  readonly estimate?: string;
  readonly status?: string;
}
