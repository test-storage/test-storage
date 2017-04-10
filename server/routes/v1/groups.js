var mongoose = require('mongoose');
var Group = require('../../models/Group.js');

var util = require('util');
var limitValidator = require('../../middlewares/validateLimitQueryParam');
var fieldsValidator = require('../../middlewares/validateFieldsQueryParam');
var pathValidator = require('../../middlewares/validateIdPathParam');

var groups = {

  /*
   * Get all groups
   *
   */
  getAll: function (req, res) {

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

    Group.find({}, fields, limit, function (err, groups) {
      if (err) return err; // TODO check proper error handling
      res.json(groups);
    });
  },

  /*
   * Get single group
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

    Group.findOne({ "_id": req.params.id }, fields, function (err, group) {
      if (err) return err; // TODO check proper error handling
      res.json(group);
    });
  },

  /*
   * Create group
   *
   */

  create: function (req, res) {
    Group.create(req.body, function (err, group) {
      if (err) return err;
      res.status(201).
        location('/api/v1/groups/' + group._id).
        json(group);
    });
  },

  /*
   * Update group
   *
   */

  update: function (req, res) {

    // check :id param
    var pathParam = pathValidator.isIdValid(req, res);
    /*
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
          'scope.testcases':{
              optional: true
          },
          'scope.testsuites':{
              optional: true
          },
          'users': { //
            optional: true, // won't validate if field is empty
            errorMessage: 'Invalid users'
          }
        });

        var errors = req.validationErrors();
        if (errors) {
          res.status(400).json('There have been validation errors: ' + util.inspect(errors));
          return;
        } */
    // TODO need security check (user input) for update
    Group.findOne({ "_id": req.params.id }, function (err, group) {

      group.name = req.body.name;
      group.description = req.body.description;
      group.scope = req.body.scope;
      //  group.scope.testsuites = req.body.scope.testsuites;
      group.users = req.body.users; // add users
      group.updated = Date.now();

      group.save(function (err, group, count) {
        if (err) return err; // TODO check proper error handling
        res.status(200).json(group);
      });
    });
  },

  /*
   * delete group
   *
   */

  delete: function (req, res) {
    // check :id param
    var pathParam = pathValidator.isIdValid(req, res);

    Group.findOneAndRemove({ "_id": req.params.id }, function (err, group) {
      if (err) return err;
      res.status(204).json(true);
    });
  },

  /*
   * Get all users of group
   *
   */

  getAllGroupUsers: function (req, res) {
    Group.find(function (err, groups) {
      if (err) return err; // TODO check proper error handling
      res.json(groups);
    });
  },

  /*
   * Get single user of group
   *
   */

  getOneGroupUser: function (req, res) {

  }
};

module.exports = groups;
