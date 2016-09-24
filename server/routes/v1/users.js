var mongoose = require('mongoose');
var User = require('../../models/User.js');

var limitValidator = require('../../middlewares/validateLimitQueryParam');
var fieldsValidator = require('../../middlewares/validateFieldsQueryParam');
var pathValidator = require('../../middlewares/validateIdPathParam');

var users = {

  /* 
   * Get all users 
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

    User.find({}, fields, limit, function (err, users) {
      if (err) return err; // TODO check proper error handling
      res.json(users);
    });
  },

  /* 
   * Get single user 
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

    User.findById(req.params.id, function (err, user) {
      if (err) return err; // TODO check proper error handling
      res.json(user);
    });
  },

  /* 
   * Create user 
   * 
   */

  create: function (req, res) {
    User.create(req.body, function (err, user) {
      if (err) return err;
      res.status(201).
        location('/api/v1/users/' + user._id).
        json(user);
    });
  },

  /* 
   * Update user 
   * 
   */

  update: function (req, res) {
    // TODO need security check (user input) for update
    User.findById(req.params.id, function (err, user) {

      user.name = req.body.name;
      user.description = req.body.description;
      user.prerequisites = req.body.prerequisites;
      user.environment = req.body.environment;
      // user.users = req.body.userss; // add userss to suite
      user.updated = Date.now();

      user.save(function (err, user, count) {
        if (err) return err; // TODO check proper error handling
        res.json(user);
      });
    });
  },

  /* 
   * delete user 
   * 
   */

  delete: function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
      if (err) return err;
      res.json(true);
    });
  }
};

module.exports = users;
