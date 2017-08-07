import * as mongoose from 'mongoose';
import { UserSetting } from '../../models/UserSetting';
import { ProjectSetting } from '../../models/ProjectSetting';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class UserSettings {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  /*
   * Get single setting / GET :id
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    UserSetting.
      findOne({ 'userId': req.params.id }).
      select(fields).
      exec(
      function (err, usersettings) {
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
            json(usersettings);
        }
      });
  }

  /*
   * Create usersettings / POST
   *
   */

  create(req, res) {
    // TODO usersettings.createdBy = currentUser;
    UserSetting.
      create(req.body,
      function (err, usersettings) {
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
            location('/api/v1/users/' + req.params.id + '/settings').
            json(usersettings);
        }
      });
  }

  /*
   * Update settings / PUT
   *
   */

  update(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    UserSetting.
      findOne({ 'userId': req.params.id }).
      exec(
      function (err, usersettings) {

        usersettings.theme = req.body.theme;
        usersettings.language = req.body.language;

        usersettings.updated = Date.now();
        // TODO usersettings.updatedBy = currentUser;

        usersettings.save(function (err, usersettings, count) {
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
              json(usersettings);
          }
        });
      });
  }

  /*
   * delete User Settings
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    UserSetting.
      findOneAndRemove({ 'userId': req.params.id }).
      exec(
      function (err, usersettings) {
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
}
