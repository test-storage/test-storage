var mongoose = require('mongoose');
var Testsuite = require('../../models/Testsuite.js');

var limitValidator = require('../../middlewares/validateLimitQueryParam');
var fieldsValidator = require('../../middlewares/validateFieldsQueryParam');
var pathValidator = require('../../middlewares/validateIdPathParam');

var testsuites = {

  /* 
   * Get all testsuites 
   * 
   */

  getAll: function (req, res) {

    var query = {};
    // check 'limit' param
    var limit = {};
    if (limitValidator.isExist(req)) {
      limitValidator.isInt(req, res);
      limit['limit'] = limitValidator.sanitize(req);
      console.log("limit:");
      console.log(limit);
    }

    // check 'fields' param
    var fields = {};
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

    Testsuite.find(query, fields, limit, function (err, testsuites) {
      if (err) return err; // TODO check proper error handling
      res.json(testsuites);
    });
  },

  /* 
   * Get single testsuite 
   * 
   */

  getOne: function (req, res) {


    // check 'fields' param
    var fields = {};
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

    // check :id param
    var pathParam = pathValidator.isMongoId(req);
    // TODO add sanitizers

    Testsuite.findById(req.params.id, fields, function (err, testsuite) {
      if (err) return err; // TODO check proper error handling
      res.json(testsuite);
    });
  },

  /* 
   * Create testsuite 
   * 
   */

  create: function (req, res) {
    Testsuite.create(req.body, function (err, testsuite) {
      if (err) return err;
      res.status(201).
        location('/api/v1/testsuites/' + testsuite._id).
        json(testsuite);
    });
  },

  /* 
   * Update testsuite 
   * 
   */

  update: function (req, res) {
    // TODO need security check (user input) for update
    Testsuite.findById(req.params.id, function (err, testsuite) {

      testsuite.name = req.body.name;
      testsuite.description = req.body.description;
      testsuite.prerequisites = req.body.prerequisites;
      testsuite.environment = req.body.environment;
      // testsuite.testcases = req.body.testcases; // add testcases to suite
      testsuite.updated = Date.now();

      testsuite.save(function (err, testsuite, count) {
        if (err) return err; // TODO check proper error handling
        res.json(testsuite);
      });
    });
  },

  /* 
   * delete testsuite 
   * 
   */

  delete: function (req, res) {
    Testsuite.findByIdAndRemove(req.params.id, function (err, testsuite) {
      if (err) return err;
      res.json(true);
    });
  }
};

module.exports = testsuites;