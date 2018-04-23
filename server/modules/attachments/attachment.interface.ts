import { Document } from 'mongoose';

export interface Attachment extends Document {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly modified: string;
  readonly size: string;
  readonly mimeType: string;
  readonly revision: string;
  readonly path: string;
  readonly icon: string;
  readonly created: string;
  readonly updated: string;
  readonly createdBy: string;
  readonly updatedBy: string;
}
