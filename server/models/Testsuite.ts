import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const TestsuiteSchema = new mongoose.Schema({
  _id: {
    type: String, unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  parentId: Number,
  projectId: { type: String, unique: true },
  enabled: Boolean,
  name: { type: String, required: true },
  description: String,
  prerequisites: String,
  environment: String,
  testcases: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

const Testsuite = mongoose.model('Testsuite', TestsuiteSchema);
export { Testsuite }
