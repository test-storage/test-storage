import * as mongoose from 'mongoose';
import { Group } from '../../models/Group';

import * as util from 'util';
import { validator } from '../../middlewares/validate';

const groups = {

  /*
   * Get all groups
   *
   */
  getAll: function (req, res) {

    // check limit, offset, fields param
    let limit = {}, offset = {}, fields = {};
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    Group.find({}, fields, limit, function (err, groups) {
      if (err) {
        console.error(err);
      }
      res.json(groups);
    });
  },

  /*
   * Get single group
   *
   */

  getOne: function (req, res) {
    // check 'fields' param
    let fields = {};
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Group.findOne({ '_id': req.params.id }, fields, function (err, group) {
      if (err) {
        console.error(err);
      }
      res.json(group);
    });
  },

  /*
   * Create group
   *
   */

  create: function (req, res) {
    Group.create(req.body, function (err, group) {
      if (err) {
        console.error(err);
      }
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
    validator.isPathValid(req, res);
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
    Group.findOne({ '_id': req.params.id }, function (err, group) {

      group.name = req.body.name;
      group.description = req.body.description;
      group.enabled = req.body.enabled;
      group.scope = req.body.scope;
      //  group.scope.testsuites = req.body.scope.testsuites;
      group.users = req.body.users; // add users
      group.updated = Date.now();

      group.save(function (err, group, count) {
        if (err) {
          console.error(err);
        }
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
    validator.isPathValid(req, res);

    Group.findOneAndRemove({ '_id': req.params.id }, function (err, group) {
      if (err) {
        console.error(err);
      }
      res.status(204).json(true);
    });
  }
};

export { groups }
