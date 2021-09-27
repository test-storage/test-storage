import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';

export const DeviceSchema = new Schema({
  _id: {
    type: String,
    default(): string {
      return randomBytes(16).toString('hex');
    }
  },
  manufacturer: String,
  deviceModel: String,
  os: String,
  osVersion: String,
  type: {
    type: String,
    enum: ['MOBILE', 'TABLET', 'SERVER', 'HARDWARE', 'VM', 'CONTAINER']
  },
  location: String,
  hostname: String,
  title: String,
  description: String,
  inventoryId: String,
  serialNumber: String,
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

