import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const TestrunSchema = new mongoose.Schema({
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
  builds: Array,
  configurations: Array,
  environments: Array,
  testcases: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

const Testrun = mongoose.model('Testrun', TestrunSchema);
export { Testrun };
