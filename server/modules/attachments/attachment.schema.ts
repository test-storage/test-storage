import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const AttachmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: String,
  description: String,
  modified: String,
  size: String,
  mimeType: String,
  revision: String,
  path: String,
  icon: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

