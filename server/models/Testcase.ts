import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const TestcaseSchema = new mongoose.Schema({
  _id: {
    type: String, unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  // key: { type: String, unique: true }, // Temporary off
  projectId: String,
  testSuiteId: String,
  priority: Number,
  order: Number,
  title: { type: String, required: true },
  description: { type: String },
  preConditions: { type: String },
  steps: Array,
  testData: Array,
  expected: Array,
  postConditions: { type: String },
  tags: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
  enabled: { type: Boolean },
  isAutomated: { type: Boolean },
  estimate: { type: Number },
  status: { type: String, default: 'created' }
});

const Testcase = mongoose.model('Testcase', TestcaseSchema);
export { Testcase }
