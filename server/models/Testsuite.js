var mongoose = require('mongoose');
var TestsuiteSchema = new mongoose.Schema({
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
  environment: String,
  testcases: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Testsuite', TestsuiteSchema);