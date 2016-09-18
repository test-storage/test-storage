var mongoose = require('mongoose');
var Testsuite = require('../../models/Testsuite.js');

var testsuites = {
 
  /* 
   * Get all testsuites 
   * 
   */
  getAll: function(req, res) {
    Testsuite.find(function (err, testsuites) {
      if (err) return err; // TODO check proper error handling
      res.json(testsuites);
    }); 
  },
 
  /* 
   * Get single testsuite 
   * 
   */

  getOne: function(req, res) {
    // TODO check params
    // req.checkParams("_id").isArray();
     Testsuite.findById(req.params.id, function (err, testsuite) {
      if (err) return err; // TODO check proper error handling
      res.json(testsuite);
    });
  },
 
  /* 
   * Create testsuite 
   * 
   */

  create: function(req, res) {
    Testsuite.create(req.body, function (err, createTestsuite) {
      if (err) return err;
      res.json(createTestsuite);
    });
  },

  /* 
   * Update testsuite 
   * 
   */
 
  update: function(req, res) {
    // TODO need security check (user input) for update
    Testsuite.findById( req.params.id, function ( err, testsuite ){
     
     testsuite.name = req.body.name;
     testsuite.description = req.body.description;
     testsuite.prerequisites = req.body.prerequisites;
     testsuite.environment = req.body.environment;
     // testsuite.testcases = req.body.testcases; // add testcases to suite
     testsuite.updated = Date.now();

     testsuite.save( function ( err, testsuite, count ){
      if (err) return err; // TODO check proper error handling
      res.json(testsuite);
     });
    });
  },

  /* 
   * delete testsuite 
   * 
   */
 
  delete: function(req, res) {
    Testsuite.findByIdAndRemove(req.params.id, function (err, testsuite) {
      if (err) return err;
      res.json(true);
    });
  }
};
 
module.exports = testsuites;