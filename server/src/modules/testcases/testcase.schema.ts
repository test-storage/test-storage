import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const TestcaseSchema = new Schema({
  _id: {
    type: String,
    default() {
      return randomBytes(16).toString('hex');
    }
  },
  // key: { type: String, unique: true }, // Temporary off
  projectId: String,
  testSuiteId: String,
  priority: {
    type: String,
    enum: ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL'],
    default: 'MAJOR'
  },
  order: Number,
  title: { type: String, required: true },
  description: { type: String },
  type: {
    type: String,
    enum: ['POSITIVE', 'NEGATIVE']
  },
  preConditions: { type: String },
  steps: Array,
  postConditions: { type: String },
  tags: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
  enabled: { type: Boolean },
  isAutomated: { type: Boolean },
  estimate: { type: String },
  status: {
    type: String,
    enum: ['CREATED', 'PENDING', 'APPROVED', 'REJECTED', 'ARCHIEVED', 'AUTOMATION_CANDIDATE', 'AUTOMATED'],
    default: 'CREATED'
  }

});
