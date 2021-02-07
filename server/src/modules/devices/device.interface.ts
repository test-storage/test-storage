import { Document } from 'mongoose';

export interface Device extends Document {
  readonly _id: string;
  readonly manufacturer: string;
  readonly deviceModel: string;
  readonly os: string;
  readonly osVersion: string;
  readonly type: string;
  readonly location?: string;
  readonly hostname?: string;
  readonly title?: string;
  readonly description?: string;
  readonly inventoryId?: string;
  readonly serialNumber?: string;
  readonly sku?: string;
  readonly assignedTo?: string[]; // User id
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}
