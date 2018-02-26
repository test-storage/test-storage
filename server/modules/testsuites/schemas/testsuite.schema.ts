import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const TestsuiteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
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
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});
