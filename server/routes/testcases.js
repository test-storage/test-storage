var mongoose = require('mongoose');
var Testcase = require('../models/Testcase.js');

var testcases = {
 
  /* 
   * Get all testcases 
   * 
   */
  getAll: function(req, res) {
    Testcase.find(function (err, testcases) {
      if (err) return err; // TODO check proper error handling
      res.json(testcases);
    });
    //var allTestcases = data; // Spoof a DB call
    
  },
 
  /* 
   * Get single testcase 
   * 
   */

  getOne: function(req, res) {
     Testcase.findById(req.params.id, function (err, testcase) {
      if (err) return err; // TODO check proper error handling
      res.json(testcase);
    });
   // var id = req.params.id;
   // var testcase = data[id]; // Spoof a DB call
   // res.json(testcase);
  },
 
  /* 
   * Create testcase 
   * 
   */

  create: function(req, res) {
    Testcase.create(req.body, function (err, createTestcase) {
      if (err) return err;
      res.json(createTestcase);
    });
    //var newTestcases = req.body;
    //data.push(newTestcases); // Spoof a DB call
    //res.json(newTestcases);
  },

  /* 
   * Update testcase 
   * 
   */
 
  update: function(req, res) {
    var updateTestcases = req.body;
    var id = req.params.id;
    data[id] = updateTestcases // Spoof a DB call
    res.json(updateTestcases);
  },

  /* 
   * delete testcase 
   * 
   */
 
  delete: function(req, res) {
    Testcase.findByIdAndRemove(req.params.id, function (err, testcase) {
      if (err) return err;
      res.json(testcase);
    });
    //var id = req.params.id;
    //data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'Testcase 1',
  id: '1'
}, {
  name: 'Testcase 2',
  id: '2'
}, {
  name: 'Testcase 3',
  id: '3'
}];
 
module.exports = testcases;
