import * as mongoose from 'mongoose';
import { Group } from '../../models/Group';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class Groups {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  /*
   * Get all groups
   *
   */
  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    Group.
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
   * Get single group
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    Group.
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
   * Create group
   *
   */

  create(req, res) {
    // TODO create body check
    Group.
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
   * Update group
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
    Group.
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
   * delete group
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    Group.
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

