var mongoose = require('mongoose');
var Project = require('../../models/Project.js');

var limitValidator = require('../../middlewares/validateLimitQueryParam');
var fieldsValidator = require('../../middlewares/validateFieldsQueryParam');
var pathValidator = require('../../middlewares/validateIdPathParam');

var projects = {

  /* 
   * Get all projects 
   * 
   */

  getAll: function (req, res) {

    var query = {};
    // check 'limit' param
    var limit = {};
    if (limitValidator.isExist(req)) {
      limitValidator.isInt(req, res);
      limit['limit'] = limitValidator.sanitize(req);
      console.log("limit:");
      console.log(limit);
    }

    // check 'fields' param
    var fields = {};
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

    Project.find(query, fields, limit, function (err, projects) {
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
    if (fieldsValidator.isExist(req)) {
      fields = fieldsValidator.parseFields(req)
    }

    // check :id param
    var pathParam = pathValidator.isMongoId(req, res);
    // TODO add sanitizers

    Project.findById(req.params.id, fields, function (err, project) {
      if (err) return err; // TODO check proper error handling
      res.json(project);
    });
  },

  /* 
   * Create project 
   * 
   */

  create: function (req, res) {
    project.create(req.body, function (err, project) {
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
    // TODO need security check (user input) for update
    Project.findById(req.params.id, function (err, project) {

      project.name = req.body.name;
      project.description = req.body.description;
      project.prerequisites = req.body.prerequisites;
      project.environment = req.body.environment;
      // project.testcases = req.body.testcases; // add testcases to suite
      project.updated = Date.now();

      project.save(function (err, project, count) {
        if (err) return err; // TODO check proper error handling
        res.json(project);
      });
    });
  },

  /* 
   * delete project 
   * 
   */

  delete: function (req, res) {
    // check :id param
    var pathParam = pathValidator.isMongoId(req, res);

    Project.findByIdAndRemove(req.params.id, function (err, project) {
      if (err) return err;
      res.json(true);
    });
  }
};

module.exports = projects;