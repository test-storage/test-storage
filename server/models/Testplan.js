var mongoose = require('mongoose');
var TestplanSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  builds: Array,
  //configurations: [Object],
  environments: Array,
  testruns: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: Number,
  updatedBy: Number
});

module.exports = mongoose.model('Testplan', TestplanSchema);