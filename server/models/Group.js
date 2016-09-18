var mongoose = require('mongoose');
var GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  scope: Object,
  users: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Group', GroupSchema);