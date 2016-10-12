var mongoose = require('mongoose');
var TestcaseSchema = new mongoose.Schema({
  parentId: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  prerequisites: {
    type: String
  },
  steps: Object,
  actual: String,
  expected: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: {
    type: Number
  },
  updatedBy: {
    type: Number
  },
  enabled: {
    type: Boolean
  },
  isAutomated: {
    type: Boolean
  },
  version: {
    type: Number
  },
  childId: {
    type: Number
  }
});

module.exports = mongoose.model('Testcase', TestcaseSchema);
