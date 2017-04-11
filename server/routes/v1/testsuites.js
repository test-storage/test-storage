var mongoose = require('mongoose');
var Testsuite = require('../../models/Testsuite.js');

var util = require('util');
var validator = require('../../middlewares/validate');

var testsuites = {

  /*
   * Get all testsuites
   *
   */

  getAll: function (req, res) {

    // check limit, offset, fields param
    var limit = {}, offset = {}, fields = {};
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    Testsuite.find({}, fields, limit, function (err, testsuites) {
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
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Testsuite.findOne({ "_id": req.params.id }, fields, function (err, testsuite) {
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
    // check :id param
    validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    Testsuite.findOne({ "_id": req.params.id }, function (err, testsuite) {

      testsuite.parentId = req.body.parentId;
      testsuite.name = req.body.name;
      testsuite.description = req.body.description;
      testsuite.prerequisites = req.body.prerequisites;
      testsuite.environment = req.body.environment;
      testsuite.testcases = req.body.testcases; // add testcases to suite
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
    // check :id param
    validator.isPathValid(req, res);

    Testsuite.findOneAndRemove({ "_id": req.params.id }, function (err, testsuite) {
      if (err) return err;
      res.status(204).json(true);
    });
  }
};

module.exports = testsuites;