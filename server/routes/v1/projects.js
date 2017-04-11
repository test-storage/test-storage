var mongoose = require('mongoose');
var Project = require('../../models/Project.js');

var util = require('util');
var validator = require('../../middlewares/validate');

var projects = {

  /*
   * Get all projects
   *
   */

  getAll: function (req, res) {

    // check limit, offset, fields param
    var limit = {}, offset = {}, fields = {};
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    Project.find({}, fields, limit, function (err, projects) {
      if (err) return err; // TODO check proper error handling
      res.json(projects);
    });
  },

  /*
   * Get single project
   *
   */

  getOne: function (req, res) {

    // check 'fields' param
    var fields = {};
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Project.findOne({ "_id": req.params.id }, fields, function (err, project) {
      if (err) return err; // TODO check proper error handling
      res.json(project);
    });
  },

  /*
   * Create project
   *
   */

  create: function (req, res) {
    Project.create(req.body, function (err, project) {
      if (err) return err;
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
    Project.findOne({ "_id": req.params.id }, function (err, project) {

      project.name = req.body.name;
      project.description = req.body.description;
      project.enabled = req.body.enabled;
      project.testcases = req.body.testcases;
      project.updated = Date.now();

      project.save(function (err, project, count) {
        if (err) return err; // TODO check proper error handling
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

    Project.findOneAndRemove({ "_id": req.params.id }, function (err, project) {
      if (err) return err;
      res.status(204).json(true);
    });
  }
};

module.exports = projects;