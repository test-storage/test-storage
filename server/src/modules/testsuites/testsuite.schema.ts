import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const TestsuiteSchema = new Schema({
  _id: {
    type: String,
    default(): string {
      return randomBytes(16).toString('hex');
    }
  },
  parentId: String,
  projectId: String,
  status: {
    type: String,
    enum: ['ACTIVE', 'ARCHIEVED']
  },
  name: { type: String, required: true },
  description: String,
  order: Number,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});
