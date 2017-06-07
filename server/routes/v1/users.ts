import * as mongoose from 'mongoose';
import { User } from '../../models/User';

import * as util from 'util';
import { validator } from '../../middlewares/validate';

const users = {

  /*
   * Get all users
   *
   */
  getAll: function (req, res) {

    // check limit, offset, fields param
    const limit = validator.validateLimit(req, res);
    const fields = validator.validateFields(req, res);
    const offset = validator.validateOffset(req, res);

    User.
      find({}).
      select(fields).
      limit(limit).
      skip(offset).
      exec(
      function (err, users) {

        if (err) {
          console.log(err);

          res.
            status(500).
            json({
              'status': 500,
              'message': 'Error occured. ' + err
            });
        } else {

          // delete password from data array
          users.map(function (props) {
            props.password = undefined;
            return true;
          });

          res.
            status(200).
            json(users);
        }

      });

  },

  /*
   * Get single user
   *
   */

  getOne: function (req, res) {

    // check 'fields' and ':id' params
    const fields = validator.validateFieldsWithExcludes(req, res);
    fields['password'] = 0;
    validator.isPathValid(req, res);
    // TODO add sanitizers

    User.
      findOne({ '_id': req.params.id }, fields).
      exec(
      function (err, user) {

        if (err) {
          console.log(err);

          res.
            status(500).
            json({
              'status': 500,
              'message': 'Error occured. ' + err
            });
        } else {

          // delete password from data object
          user.password = undefined;


          res.
            status(200).
            json(user);
        }

      });
  },

  /*
   * Create user
   *
   */

  create: function (req, res) {
    // TODO check body data
    User.
      create(req.body,
      function (err, user) {

        if (err) {
          console.error(err);
        } else {

          // delete password from data object
          user.password = undefined;

          res.
            status(201).
            location('/api/v1/users/' + user._id).
            json(user);
        }
      });

  },

  /*
   * Update user
   *
   */

  update: function (req, res) {

    const fields = ' -password';
    // check :id param
    validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    User.findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, user) {

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

          // delete password from data object
          user.password = undefined;

          res.
            status(200).
            json(user);
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

    User.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, user) {

        if (err) {
          console.error(err);
        }

        res.
          status(204).
          json(true);
      });
  }
};

export { users }
