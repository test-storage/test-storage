var mongoose = require('mongoose');
var TestcaseSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  key: {
    type: String,
    unique: true
  },
  parentId: {
    type: Number
  },
  priority: {
    type: Number
  },
  order: {
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
  steps: Array,
  expected: Array,
  tags: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: {
    type: String
  },
  updatedBy: {
    type: String
  },
  enabled: {
    type: Boolean
  },
  isAutomated: {
    type: Boolean
  },
  estimate: {
    type: Number
  },
  status: {
    type: String
  },
  childId: {
    type: Number
  }
});

module.exports = mongoose.model('Testcase', TestcaseSchema);
