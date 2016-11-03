var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('User', UserSchema);