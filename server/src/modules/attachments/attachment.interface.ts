import { Document } from 'mongoose';

export interface Attachment extends Document {
  readonly _id: string;
  readonly name: string;
  readonly fileName: string;
  readonly image?: string;
  readonly thumbnail?: string;
  readonly size: number;
  readonly mimeType: string;
  readonly revision?: string;
  readonly path: string;
  readonly icon?: string;
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
