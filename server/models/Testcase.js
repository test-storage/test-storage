var mongoose = require('mongoose');
var TestcaseSchema = new mongoose.Schema({
  parentId: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  prerequisites: {
    type: String
  },
  // steps: Object,
  actual: String,
  expected: String,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  childId: {
    type: Number
  }
});

TestcaseSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
});

module.exports = mongoose.model('Testcase', TestcaseSchema);