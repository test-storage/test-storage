import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const TestResultSchema = new Schema({
  _id: {
    type: String,
    default(): string {
      return randomBytes(16).toString('hex');
    }
  },
  projectId: String,
  testrunId: String,
  testcaseId: String,
  builds: Array,
  platforms: Array,
  status: {
    type: String,
    enum: ['PASSED', 'FAILED', 'SKIPPED', 'BLOCKED', 'UNTESTED']
  },
  notes: String,
  attachments: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});
