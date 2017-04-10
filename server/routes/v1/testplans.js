var mongoose = require('mongoose');
var Testplan = require('../../models/Testplan.js');

var util = require('util');
var limitValidator = require('../../middlewares/validateLimitQueryParam');
var fieldsValidator = require('../../middlewares/validateFieldsQueryParam');
var pathValidator = require('../../middlewares/validateIdPathParam');

var testplans = {

  /*
   * Get all testplans / GET
   *
   */

  getAll: function (req, res) {

    var query = {};
    // check 'limit' param
    var limit = {};
    if (limitValidator.isExist(req)) {
      limitValidator.isInt(req, res);
      limit['limit'] = limitValidator.sanitize(req);
    } else {
      // default limit
      limit['limit'] = 25;
    }

    // check 'fields' param
    var fields = {};
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

    Testplan.find(query, fields, limit, function (err, testplans) {
      if (err) return err; // TODO check proper error handling
      res.json(testplans);
    });
  },

  /*
   * Get single testplan / GET :id
   *
   */

  getOne: function (req, res) {


    // check 'fields' param
    var fields = {};
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

    // check :id param
    var pathParam = pathValidator.isIdValid(req, res);
    // TODO add sanitizers

    Testplan.findOne({ "_id": req.params.id }, fields, function (err, testplan) {
      if (err) return err; // TODO check proper error handling
      res.json(testplan);
    });
  },

  /*
   * Create testplan / POST
   *
   */

  create: function (req, res) {
    // TODO testplan.createdBy = currentUser;
    Testplan.create(req.body, function (err, testplan) {
      if (err) return err;
      res.status(201).
        location('/api/v1/testplans/' + testplan._id).
        json(testplan);
    });
  },

  /*
   * Update testplan / PUT
   *
   */

  update: function (req, res) {
    // check :id param
    var pathParam = pathValidator.isIdValid(req, res);

    // TODO need security check (user input) for update
    Testplan.findOne({ "_id": req.params.id }, function (err, testplan) {

      testplan.name = req.body.name;
      testplan.description = req.body.description;
      testplan.builds = req.body.builds;
      //   testplan.configurations = req.body.configurations;
      testplan.environments = req.body.environments;
      testplan.testruns = req.body.testruns;
      testplan.updated = Date.now();
      // TODO testplan.updatedBy = currentUser;

      testplan.save(function (err, testplan, count) {
        if (err) return err; // TODO check proper error handling
        res.json(testplan);
      });
    });
  },

  /*
   * delete testplan
   *
   */

  delete: function (req, res) {
    // check :id param
    var pathParam = pathValidator.isIdValid(req, res);

    Testplan.findOneAndRemove({ "_id": req.params.id }, function (err, testplan) {
      if (err) return err;
      res.status(204).json(true);
    });
  }
};

module.exports = testplans;