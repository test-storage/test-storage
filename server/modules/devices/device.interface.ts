import { Document } from 'mongoose';

export interface Device extends Document {
  readonly _id?: string;
  readonly manufacturer: string;
  readonly model: string;
  readonly os: string;
  readonly osVersion: string;
  readonly type: DeviceType;
  readonly location?: string;
  readonly hostname?: string;
  readonly title?: string;
  readonly description?: string;
  readonly inventoryId?: string;
  readonly sku?: string;
  readonly assignedTo: Array<string>; // User id
  readonly created?: Date;
  readonly updated?: Date;
  readonly createdBy?: string;
  readonly updatedBy?: string;
}

export enum DeviceType {
  MOBILE,
  TABLET,
  SERVER,
  HARDWARE,
  VM,
  CONTAINER
}
