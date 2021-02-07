export class Device {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  manufacturer!: string;
  model!: string;
  os!: string;
  osVersion!: string;
  type!: DeviceType;
  location?: string;
  hostname?: string;
  title?: string;
  description?: string;
  inventoryId?: string;
  serialNumber?: string;
  sku?: string;
  assignedTo?: Array<string>; // User id
  created?: Date;
  updated?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export enum DeviceType {
  MOBILE,
  TABLET,
  SERVER,
  HARDWARE,
  VM,
  CONTAINER
}
