import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const DeviceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return crypto.randomBytes(16).toString('hex');
    }
  },
  manufacturer: String,
  model: String,
  os: String,
  osVersion: String,
  type: Number,
  location: String,
  hostname: String,
  title: String,
  description: String,
  inventoryId: String,
  sku: String,
  assignedTo: Array, // User id
  /*
  status: {
    type: String,
    enum: ['OK', 'BROKEN', 'REPAIRING', 'N/A'],
    default: 'OK'
  },*/
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

