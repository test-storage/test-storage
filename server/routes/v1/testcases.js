var mongoose = require('mongoose');
var Testcase = require('../../models/Testcase.js');

var util = require('util');
var limitValidator = require('../../middlewares/validateLimitQueryParam');
var fieldsValidator = require('../../middlewares/validateFieldsQueryParam');
var pathValidator = require('../../middlewares/validateIdPathParam');

var testcases = {

  /*
   * Get all testcases
   *
   */
  getAll: function (req, res) {

    // check 'limit' param
    var limit = {};
    if (limitValidator.isExist(req)) {
      limitValidator.isInt(req, res);
      limit['limit'] = limitValidator.sanitize(req);
    } else {
      limit['limit'] = 25;
    }

    // check 'fields' param
    var fields = {};
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

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
    // TODO turn off _id from response by default
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

    // check :id param
    var pathParam = pathValidator.isMongoId(req, res);
    // TODO add sanitizers

    Testcase.findById(req.params.id, fields, function (err, testcase) {
      if (err) return err; // TODO check proper error handling
      res.json(testcase);
    });
  },

  /*
   * Create testcase
   *
   */

  create: function (req, res) {
    // TODO add validation
    let _requestBody = req.body;
    _requestBody.status = "created";
    Testcase.create(_requestBody, function (err, testcase) {
      if (err) return err;
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

    // check body
    req.checkBody({
      'name': {
        notEmpty: true,
        errorMessage: 'Name required'
      },
      'description': {
        notEmpty: true,
        errorMessage: 'Name required' // Error message for the parameter
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

    Testcase.findById(req.params.id, function (err, testcase) {
      testcase.parentId = req.body.parentId;
      testcase.priority = req.body.priority;
      testcase.order = req.body.order;
      testcase.name = req.body.name;
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
        if (err) return err; // TODO check proper error handling
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
    var pathParam = pathValidator.isMongoId(req, res);

    Testcase.findByIdAndRemove(req.params.id, function (err, testcase) {
      if (err) return err;
      res.status(204).json(true);
    });
  }
};

module.exports = testcases;
