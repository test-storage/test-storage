import * as util from 'util';
import { Validator } from '../../middlewares/validate';
import { Auth } from '../auth';

import { ProjectsCollection } from './database/projects';

export class Projects {

  public validator: Validator = new Validator();
  private auth: Auth = new Auth();
  private db: ProjectsCollection = new ProjectsCollection();
  /*
   * Get all projects
   *
   */

  getAll(req, res) {

    // check limit, offset, fields param
    const limit: number = this.validator.validateLimit(req, res);
    const fields: number = this.validator.validateFields(req, res);
    const offset: number = this.validator.validateOffset(req, res);


    this.db.getAll(limit, fields, offset, function (err, projects) {
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


    this.db.getOne(req.params.id, fields, function (err, project) {
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
    this.db.create(req.body, function (err, project) {
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
    this.db.update(req.body, req.params.id, function (err, project) {
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
   * Delete Project
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    this.db.delete(req.params.id, function (err, project) {
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
