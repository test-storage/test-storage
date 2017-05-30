import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const GroupSchema = new mongoose.Schema({
  _id: {
    type: String, unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: { type: String, required: true },
  description: String,
  enabled: Boolean,
  scope: Object,
  users: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

const Group = mongoose.model('Group', GroupSchema);
export { Group }
