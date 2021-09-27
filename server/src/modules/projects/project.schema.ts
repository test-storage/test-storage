import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const ProjectSchema = new Schema({
  _id: {
    type: String,
    default() {
      return randomBytes(16).toString('hex');
    }
  },
  name: String,
  description: String,
  photo: String,
  avatarColor: Number,
  enabled: { type: Boolean, default: true },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

