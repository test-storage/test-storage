import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const UserStorySchema = new Schema({
  _id: {
    type: String,
    default: function () {
      return randomBytes(16).toString('hex');
    }
  },
  // key: { type: String, unique: true }, // Temporary off
  projectId: String,
  priority: {
    type: String,
    enum: ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL'],
    default: 'MAJOR'
  },
  order: Number,
  title: { type: String, required: true },
  description: { type: String },
  actor: { type: String }, // TODO enum?
  testCases: Array,
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
    enum: ['CREATED', 'PENDING', 'APPROVED', 'REJECTED', 'ARCHIEVED'],
    default: 'CREATED'
  }

});
