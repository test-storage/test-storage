var mongoose = require('mongoose');
var TestcaseSchema = new mongoose.Schema({
 /* id: { 
    type: Number, 
    unique: true, 
    required: true
  }, */
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
    },
 // steps: Object,
  actual_result: String,
  expected_result: String,
  created_at: { type: Date, default: Date.now }, // TODO check only added when created
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Testcase', TestcaseSchema);