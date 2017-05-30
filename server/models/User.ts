import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  title: String,
  groups: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

const User = mongoose.model('User', UserSchema);
export { User }
