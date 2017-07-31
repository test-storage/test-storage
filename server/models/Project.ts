import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const ProjectSchema = new mongoose.Schema({
  _id: { type: String, unique: true,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  name: { type: String, required: true },
  description: String,
  enabled: { type: Boolean, default: true },
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

const Project = mongoose.model('Project', ProjectSchema);
export { Project };
