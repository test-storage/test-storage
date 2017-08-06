import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const TestplanSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  projectId: String,
  builds: Array,
  environments: Array,
  platforms: Array,
  testcases: Array,
  startDate: { type: Date },
  endDate: { type: Date },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

const Testplan = mongoose.model('Testplan', TestplanSchema);
export { Testplan };
