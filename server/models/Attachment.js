var mongoose = require('mongoose');
var AttachmentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  modified: String,
  size: String,
  mimeType: String,
  revision: String,
  path: {
    type: String,
    required: true
  },
  icon: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Attachment', AttachmentSchema);