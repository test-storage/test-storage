import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const NotificationSchema = new Schema({
  _id: {
    type: String,
    default() {
      return randomBytes(16).toString('hex');
    }
  },
  entity: String, // TODO ENUM
  action: String,
  senderId: String,
  recipientId: String,
  isRead: { type: Boolean, default: false },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});
