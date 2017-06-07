import * as mongoose from 'mongoose';
import { Project } from '../../models/Project';

import * as util from 'util';
import { validator } from '../../middlewares/validate';

const projects = {

  /*
   * Get all projects
   *
   */

  getAll: function (req, res) {

    // check limit, offset, fields param
    const limit = validator.validateLimit(req, res);
    const fields = validator.validateFields(req, res);
    const offset = validator.validateOffset(req, res);

    Project.
      find({}).
      limit(limit).
      select(fields).
      skip(offset).
      exec(
      function (err, projects) {
        if (err) {
          console.error(err);
        }
        res.
          status(200).
          json(projects);
      });
  },

  /*
   * Get single project
   *
   */

  getOne: function (req, res) {

    // check 'fields' and ':id' params
    const fields = validator.validateFields(req, res);
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Project.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, project) {
        if (err) {
          console.error(err);
        }
        res.
          status(200).
          json(project);
      });
  },

  /*
   * Create project
   *
   */

  create: function (req, res) {

    // TODO req.body validation
    Project.
      create(req.body,
      function (err, project) {
        if (err) {
          console.error(err);
        }

        res.
          status(201).
          location('/api/v1/projects/' + project._id).
          json(project);
      });
  },

  /*
   * Update project
   *
   */

  update: function (req, res) {
    // check :id param
    validator.isPathValid(req, res);

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

        project.save(function (err, project, count) {
          if (err) {
            console.error(err);
          }

          res.
            status(200).
            json(project);
        });
      });
  },

  /*
   * Delete Project
   *
   */

  delete: function (req, res) {
    // check :id param
    validator.isPathValid(req, res);

    Project
      .findOneAndRemove({ '_id': req.params.id })
      .exec(
      function (err, project) {
        if (err) {
          console.error(err);
        }

        res.
          status(204).
          json(true);
      });
  }
};

export { projects }
