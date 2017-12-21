import * as mongoose from 'mongoose';

export const TestsuiteSchema = new mongoose.Schema({
  title: String,
  description: String
});
