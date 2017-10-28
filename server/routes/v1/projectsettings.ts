import * as mongoose from 'mongoose';
import { ProjectSetting } from '../../models/ProjectSetting';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

import { ProjectSettingsCollection } from './database/projectsettings';

export class ProjectSettings {

  private validator: Validator = new Validator();
  private db: ProjectSettingsCollection = new ProjectSettingsCollection();

  /*
   * Get single setting / GET :id
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    this.db.getOne(req.params.id, fields, function (err, projectsettings) {
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
    this.db.create(req.body, function (err, projectsettings) {
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
    this.db.update(req.body, req.params.id, function (err, projectsettings) {
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
   * delete Settings
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    this.db.delete(req.params.id, function (err, projectsettings) {
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
