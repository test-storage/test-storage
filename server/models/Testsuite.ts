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
  projectId: String,
  enabled: Boolean, // TODO delete
  /* TODO
  status: {
    enum: ['ACTIVE', 'ARCHIEVED']
  },
  */
  name: { type: String, required: true },
  description: String,
  /* TODO delete if not needed */
  prerequisites: String,
  environment: String,
  testcases: Array,
  /* end */
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

const Testsuite = mongoose.model('Testsuite', TestsuiteSchema);
export { Testsuite };
