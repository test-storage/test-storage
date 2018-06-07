import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const TestResultSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
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
