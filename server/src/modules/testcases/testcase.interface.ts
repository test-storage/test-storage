import { Document } from 'mongoose';

export interface Testcase extends Document {
  readonly _id: string;
  readonly key?: string;
  readonly projectId: string;
  readonly testSuiteId: string;
  readonly priority?: string;
  readonly order?: number;
  readonly title: string;
  readonly description?: string;
  readonly type?: string;
  readonly preConditions?: string;
  readonly steps?: string[];
  readonly postConditions?: string;
  readonly tags?: string[];
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
  readonly enabled?: boolean;
  readonly isAutomated?: boolean;
  readonly estimate?: string;
  readonly status?: string;
}
