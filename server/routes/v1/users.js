var mongoose = require('mongoose');
var User = require('../../models/User.js');

var util = require('util');
var validator = require('../../middlewares/validate');

var users = {

  /*
   * Get all users
   *
   */
  getAll: function (req, res) {

    // check limit, offset, fields param
    var limit = {}, offset = {}, fields = {};
    fields['password'] = 0;
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    User.find({}, fields, limit, function (err, users) {
      if (err) {
        console.error(err);
      }
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
    fields['password'] = 0;
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    User.findOne({ "_id": req.params.id }, fields, function (err, user) {
      if (err) {
        console.error(err);
      }
      res.json(user);
    });
  },

  /*
   * Create user
   *
   */

  create: function (req, res) {
    User.create(req.body, function (err, user) {
      if (err) {
        console.error(err);
      }
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

    var fields = {};
    fields['password'] = 0;
    // check :id param
    validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    User.findOne({ "_id": req.params.id }, fields, function (err, user) {

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.title = req.body.title;
      user.groups = req.body.groups;
      user.updated = Date.now();

      user.save(function (err, user, count) {
        if (err) {
          console.error(err);
        }
        res.json(user);
      });
    });
  },

  /*
   * delete user
   *
   */

  delete: function (req, res) {
    // check :id param
    validator.isPathValid(req, res);

    User.findOneAndRemove({ "_id": req.params.id }, function (err, user) {
      if (err) {
        console.error(err);
      }
      res.status(204).json(true);
    });
  }
};

module.exports = users;
