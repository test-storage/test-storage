import * as mongoose from 'mongoose';

export const TestcaseSchema = new mongoose.Schema({
  title: String,
  description: String
});
