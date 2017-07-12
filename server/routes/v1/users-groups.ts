import * as mongoose from 'mongoose';
import { UserGroup } from '../../models/UserGroup';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class UserGroups {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  /*
   * Get all user groups
   *
   */
  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    UserGroup.
      find({}).
      limit(limit).
      select(fields).
      skip(offset).
      exec(
      function (err, groups) {

        if (err) {
          console.log(err);
          res.
            set('Content-Type', 'application/json').
            status(500).
            json({
              'status': 500,
              'message': 'Error occured. ' + err
            });
        } else {
          res.
            set('Content-Type', 'application/json').
            status(200).
            json(groups);
        }
      });
  }

  /*
   * Get single user group
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    UserGroup.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, group) {

        if (err) {
          console.log(err);
          res.
            set('Content-Type', 'application/json').
            status(500).
            json({
              'status': 500,
              'message': 'Error occured. ' + err
            });
        } else {
          res.
            set('Content-Type', 'application/json').
            status(200).
            json(group);
        }
      });
  }

  /*
   * Create user group
   *
   */

  create(req, res) {
    // TODO create body check
    UserGroup.
      create(req.body,
      function (err, group) {

        if (err) {
          console.log(err);
          res.
            set('Content-Type', 'application/json').
            status(500).
            json({
              'status': 500,
              'message': 'Error occured. ' + err
            });
        } else {
          res.
            set('Content-Type', 'application/json').
            status(201).
            location('/api/v1/groups/' + group._id).
            json(group);
        }
      });
  }

  /*
   * Update user group
   *
   */

  update(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);
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
    UserGroup.
      findOne({ '_id': req.params.id }).
      exec(
      function (err, group) {

        group.name = req.body.name;
        group.description = req.body.description;
        group.enabled = req.body.enabled;
        group.scope = req.body.scope;
        //  group.scope.testsuites = req.body.scope.testsuites;
        group.users = req.body.users; // add users
        group.updated = Date.now();

        group.save(function (err, group, count) {

          if (err) {
            console.log(err);
            res.
              set('Content-Type', 'application/json').
              status(500).
              json({
                'status': 500,
                'message': 'Error occured. ' + err
              });
          } else {
            res.
              set('Content-Type', 'application/json').
              status(200).
              json(group);
          }
        });
      });
  }

  /*
   * delete user group
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    UserGroup.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, group) {

        if (err) {
          console.log(err);
          res.
            set('Content-Type', 'application/json').
            status(500).
            json({
              'status': 500,
              'message': 'Error occured. ' + err
            });
        } else {
          res.
            set('Content-Type', 'application/json').
            status(204).
            json(true);
        }
      });
  }
};

