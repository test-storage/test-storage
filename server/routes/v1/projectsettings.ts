import * as mongoose from 'mongoose';
import { ProjectSetting } from '../../models/ProjectSetting';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class ProjectSettings {

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

    ProjectSetting.
      findOne({ 'projectId': req.params.id }).
      select(fields).
      exec(
      function (err, projectsettings) {
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
            json(projectsettings);
        }
      });
  }

  /*
   * Create settings / POST
   *
   */

  create(req, res) {
    // TODO projectsettings.createdBy = currentUser;
    ProjectSetting.
      create(req.body,
      function (err, projectsettings) {
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
            location('/api/v1/projects/' + req.params.id + '/settings').
            json(projectsettings);
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
    ProjectSetting.
      findOne({ 'projectId': req.params.id }).
      exec(
      function (err, projectsettings) {

        // TODO

        projectsettings.updated = Date.now();
        // TODO projectsettings.updatedBy = currentUser;

        projectsettings.save(function (err, projectsettings, count) {
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
              json(projectsettings);
          }
        });
      });
  }

  /*
   * delete Settings
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    ProjectSetting.
      findOneAndRemove({ 'projectId': req.params.id }).
      exec(
      function (err, projectsettings) {
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
