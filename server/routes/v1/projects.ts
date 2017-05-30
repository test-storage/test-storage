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
    let limit = {}, offset = {}, fields = {};
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    Project.find({}, fields, limit, function (err, projects) {
      if (err) {
        console.error(err);
      }
      res.json(projects);
    });
  },

  /*
   * Get single project
   *
   */

  getOne: function (req, res) {

    // check 'fields' param
    let fields = {};
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Project.findOne({ '_id': req.params.id }, fields, function (err, project) {
      if (err) {
        console.error(err);
      }
      res.json(project);
    });
  },

  /*
   * Create project
   *
   */

  create: function (req, res) {
    Project.create(req.body, function (err, project) {
      if (err) {
        console.error(err);
      }
      res.status(201).
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
    Project.findOne({ '_id': req.params.id }, function (err, project) {

      project.name = req.body.name;
      project.description = req.body.description;
      project.enabled = req.body.enabled;
      project.testcases = req.body.testcases;
      project.updated = Date.now();

      project.save(function (err, project, count) {
        if (err) {
          console.error(err);
        }
        res.json(project);
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

    Project.findOneAndRemove({ '_id': req.params.id }, function (err, project) {
      if (err) {
        console.error(err);
      }
      res.status(204).json(true);
    });
  }
};

export { projects }
