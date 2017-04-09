var mongoose = require('mongoose');
var AttachmentSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  description: String,
  modified: String,
  size: String,
  mimeType: String,
  revision: String,
  path: {
    type: String
  },
  icon: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Attachment', AttachmentSchema);