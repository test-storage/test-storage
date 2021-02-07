import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const TestrunSchema = new Schema({
  _id: {
    type: String,
    default(): string {
      return randomBytes(16).toString('hex');
    }
  },
  name: { type: String, required: true },
  description: String,
  projectId: String,
  builds: Array,
  environments: Array,
  platforms: Array,
  testcases: Array,
  status: {
    type: String,
    enum: ['OPEN', 'COMPLETED'],
    default: 'OPEN'
  },
  progress: {
    type: Number,
    default: 0
  },
  archieved: Boolean,
  startDate: { type: Date },
  endDate: { type: Date },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});
