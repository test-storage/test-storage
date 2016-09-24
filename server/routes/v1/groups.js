var mongoose = require('mongoose');
var Group = require('../../models/Group.js');

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
    pathValidator.isMongoId(req);
    // TODO add sanitizers

    Group.findById(req.params.id, fields, function (err, group) {
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
    // TODO need security check (user input) for update
    Group.findById(req.params.id, function (err, group) {

      group.name = req.body.name;
      group.description = req.body.description;
      group.prerequisites = req.body.prerequisites;
      group.environment = req.body.environment;
      // group.users = req.body.userss; // add userss to suite
      group.updated = Date.now();

      group.save(function (err, group, count) {
        if (err) return err; // TODO check proper error handling
        res.json(group);
      });
    });
  },

  /* 
   * delete group 
   * 
   */

  delete: function (req, res) {
    Group.findByIdAndRemove(req.params.id, function (err, group) {
      if (err) return err;
      res.json(true);
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
