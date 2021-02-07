import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const AttachmentSchema = new Schema({
  _id: {
    type: String,
    default() {
      return randomBytes(16).toString('hex');
    }
  },
  name: String,
  fileName: String,
  image: String,
  thumbnail: String,
  size: Number,
  mimeType: String,
  revision: String,
  path: String,
  icon: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

