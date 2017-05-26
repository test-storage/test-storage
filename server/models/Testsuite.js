var mongoose = require('mongoose');
const crypto = require('crypto');
var TestsuiteSchema = new mongoose.Schema({
  _id: { type: String, unique: true,
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

module.exports = mongoose.model('Testsuite', TestsuiteSchema);