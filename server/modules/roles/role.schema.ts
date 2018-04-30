import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const RoleSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: String,
  description: String
});
