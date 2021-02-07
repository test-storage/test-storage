export class Notification {
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  _id?: string;
  entity!: string;
  action!: string;
  senderId!: string;
  recipientId!: string;
  // type: string; // danger, info, success, etc
  // alertAction: string;
  isRead!: boolean;
  created?: Date;
  updated?: Date;
  createdBy?: string;
  updatedBy?: string;
}
