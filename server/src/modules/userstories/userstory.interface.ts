import { Document } from 'mongoose';

export interface UserStory extends Document {
  readonly _id: string;
  readonly key?: string;
  readonly projectId: string;
  readonly priority?: string;
  readonly order?: number;
  readonly title: string;
  readonly description?: string;
  readonly actor: string;
  readonly testCases?: Array<string>;
  readonly tags?: Array<string>;
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
  readonly enabled?: boolean;
  readonly isAutomated?: boolean;
  readonly estimate?: string;
  readonly status?: string;
}
