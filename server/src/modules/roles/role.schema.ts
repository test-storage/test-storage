import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const RoleSchema = new Schema({
  _id: {
    type: String,
    default() {
      return randomBytes(16).toString('hex');
    }
  },
  name: { type: String, required: true },
  description: String
});
