import * as mongoose from 'mongoose';
import { Project } from '../../models/Project';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';
import { Auth } from '../auth';

export class Projects {

  public validator: Validator;
  private auth: Auth;

  constructor() {
    // TODO thinking about DI
    this.validator = new Validator();
    this.auth = new Auth();
  }

  /*
   * Get all projects
   *
   */

  getAll(req, res) {

    // check limit, offset, fields param
    const limit: number = this.validator.validateLimit(req, res);
    const fields: number = this.validator.validateFields(req, res);
    const offset: number = this.validator.validateOffset(req, res);

    Project.
      find({}).
      limit(limit).
      select(fields).
      skip(offset).
      exec(
      function (err, projects) {
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
            json(projects);
        }
      });
  }

  /*
   * Get single project
   *
   */

  getOne(req, res) {
    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    Project.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, project) {
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
            json(project);
        }
      });
  }

  /*
   * Create project
   *
   */

  create(req, res) {

    const body = req.body;
    body.createdBy = this.auth.getUserId(req, res);

    // TODO req.body validation
    Project.
      create(req.body,
      function (err, project) {
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
            location('/api/v1/projects/' + project._id).
            json(project);
        }
      });
  }

  /*
   * Update project
   *
   */

  update(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    Project
      .findOne({ '_id': req.params.id })
      .exec(
      function (err, project) {
        project.name = req.body.name;
        project.description = req.body.description;
        project.enabled = req.body.enabled;
        project.testcases = req.body.testcases;
        project.updated = Date.now();
        project.updatedBy = () => { this.auth.getUserId(req, res); }

        project.save(function (err, project, count) {
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
              json(project);
          }
        });
      });
  }

  /*
   * Delete Project
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    Project
      .findOneAndRemove({ '_id': req.params.id })
      .exec(
      function (err, project) {
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
