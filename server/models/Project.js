var mongoose = require('mongoose');
const crypto = require('crypto');

var ProjectSchema = new mongoose.Schema({
  _id: { type: String, unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: { type: String, required: true },
  description: String,
  enabled: Boolean,
  testcases: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

module.exports = mongoose.model('Project', ProjectSchema);