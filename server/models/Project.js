var mongoose = require('mongoose');
const crypto = require('crypto');
var ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: crypto.randomBytes(16).toString('hex')
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  enabled: {
    type: Boolean
  },
  testcases: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

module.exports = mongoose.model('Project', ProjectSchema);