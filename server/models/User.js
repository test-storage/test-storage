var mongoose = require('mongoose');
const crypto = require('crypto');
var UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: crypto.randomBytes(16).toString('hex')
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  title: String,
  groups: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

module.exports = mongoose.model('User', UserSchema);