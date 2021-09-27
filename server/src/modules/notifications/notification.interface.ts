import { Document } from 'mongoose';

export interface Notification extends Document {
  readonly _id: string;
  readonly entity: string;
  readonly action: string; // TODO enum
  readonly senderId: string;
  readonly recipientId?: string;
  readonly isRead?: boolean;
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}

