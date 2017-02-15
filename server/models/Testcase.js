var mongoose = require('mongoose');
var TestcaseSchema = new mongoose.Schema({
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
  estimate: {
    type: Number
  },
  childId: {
    type: Number
  }
});

module.exports = mongoose.model('Testcase', TestcaseSchema);
