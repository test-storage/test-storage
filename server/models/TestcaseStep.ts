import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const TestcaseStepSchema = new mongoose.Schema({
  _id: {
    type: String, unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  // projectId: String,
  // testSuiteId: String,
  testcaseId: String,
  order: Number,
  action: { type: String, required: true },
  testData: String,
  expected: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: { type: String },
  updatedBy: { type: String },
  enabled: { type: Boolean },
  executionType: {
    type: String,
    enum: ['MANUAL', 'AUTOMATED'],
    default: 'MANUAL'
  }
});

const TestcaseStep = mongoose.model('TestcaseStep', TestcaseStepSchema);
export { TestcaseStep };
