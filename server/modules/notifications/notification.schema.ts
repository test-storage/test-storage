import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const NotificationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  entity: String, // TODO ENUM
  action: String,
  senderId: String,
  recipientId: String,
  isRead: Boolean,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});
