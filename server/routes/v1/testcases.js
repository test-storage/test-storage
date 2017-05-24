var mongoose = require('mongoose');
var Testcase = require('../../models/Testcase.js');

var util = require('util');
var validator = require('../../middlewares/validate');

var testcases = {

  /*
   * Get all testcases
   *
   */
  getAll: function (req, res) {

    // check limit, offset, fields param
    var limit = {}, offset = {}, fields = {};
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    Testcase.find({}, fields, limit, function (err, testcases) {
      if (err) return err; // TODO check proper error handling
      res.set('Content-Type', 'application/json')
        .status(200)
        .json(testcases);
    });
  },

  /*
   * Get single testcase
   *
   */

  getOne: function (req, res) {

    // check 'fields' param
    var fields = {};
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Testcase.findOne({ "_id": req.params.id }, fields, function (err, testcase) {
      if (err) {
        console.error(err);
      }
      res.json(testcase);
    });
  },

  /*
   * Create testcase
   *
   */

  create: function (req, res) {
    // TODO add validation

    Testcase.create(req.body, function (err, testcase) {
      if (err) {
        console.error(err);
      }
      res.status(201).
        location('/api/v1/testcases/' + testcase._id).
        json(testcase);
    });
  },

  /*
   * Update testcase
   *
   */

  update: function (req, res) {
    // TODO need security check (user input) for update

    // check :id param
    validator.isPathValid(req, res);

    // check body
    req.checkBody({
      'title': {
        notEmpty: true,
        errorMessage: 'title required'
      },
      'description': {
        notEmpty: true,
        errorMessage: 'description required' // Error message for the parameter
      },
      'prerequisites': { //
        optional: true, // won't validate if field is empty
        isLength: {
          options: [{ min: 2, max: 250 }],
          errorMessage: 'Must be between 2 and 250 chars long' // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: 'Invalid Prerequisites'
      }
    });

    var errors = req.validationErrors();
    if (errors) {
      res.status(400).json('There have been validation errors: ' + util.inspect(errors));
      return;
    }

    Testcase.findOne({ "_id": req.params.id }, function (err, testcase) {
      if (!req.body.id) {
        // TODO creation logic
        // + add id, created, createdBy and etc
      }
      testcase.testSuiteId = req.body.testSuiteId;
      testcase.priority = req.body.priority;
      testcase.order = req.body.order;
      testcase.title = req.body.title;
      testcase.description = req.body.description;
      testcase.prerequisites = req.body.prerequisites;
      testcase.steps = req.body.steps;
      testcase.expected = req.body.expected;
      testcase.tags = req.body.tags;
      testcase.estimate = req.body.estimate;
      if (req.body.status) {
        // TODO add checks
        // also "Approved"
        testcase.status = req.body.status;
      }
      testcase.updated = Date.now();

      testcase.save(function (err, testcase, count) {
        if (err) {
          console.error(err);
        }
        res.json(testcase);
      });
    });
  },

  /*
   * delete testcase
   *
   */

  delete: function (req, res) {

    // check :id param
    validator.isPathValid(req, res);

    Testcase.findOneAndRemove({ "_id": req.params.id }, function (err, testcase) {
      if (err) {
        console.error(err);
      }
      res.status(204).json(true);
    });
  }
};

module.exports = testcases;
