export class Notification {
  _id?: string;
  entity: string;
  action: string;
  senderId: string;
  recipientId: string;
  // type: string; // danger, info, success, etc
  // alertAction: string;
  isRead: boolean;
  created?: Date;
  updated?: Date;
  createdBy?: string;
  updatedBy?: string;
}
