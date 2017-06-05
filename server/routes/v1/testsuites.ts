import * as mongoose from 'mongoose';
import { Testsuite } from '../../models/Testsuite';

import * as util from 'util';
import { validator } from '../../middlewares/validate';

const testsuites = {

  /*
   * Get all testsuites
   *
   */

  getAll: function (req, res) {

    // check limit, offset, fields param
    let limit = {}, offset = {}, fields = {};
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    Testsuite.find({}, fields, limit, function (err, testsuites) {
      if (err) {
        console.error(err);
      }
      res.json(testsuites);
    });
  },

  /*
   * Get single testsuite
   *
   */

  getOne: function (req, res) {

    // check 'fields' param
    let fields = {};
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Testsuite.findOne({ '_id': req.params.id }, fields, function (err, testsuite) {
      if (err) {
        console.error(err);
      }
      res.json(testsuite);
    });
  },

  /*
   * Create testsuite
   *
   */

  create: function (req, res) {
    Testsuite.create(req.body, function (err, testsuite) {
      if (err) {
        console.error(err);
      }
      res.status(201).
        location('/api/v1/testsuites/' + testsuite._id).
        json(testsuite);
    });
  },

  /*
   * Update testsuite
   *
   */

  update: function (req, res) {
    // check :id param
    validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    Testsuite.findOne({ '_id': req.params.id }, function (err, testsuite) {

      testsuite.parentId = req.body.parentId;
      testsuite.enabled = req.body.enabled;
      testsuite.name = req.body.name;
      testsuite.description = req.body.description;
      testsuite.prerequisites = req.body.prerequisites;
      testsuite.environment = req.body.environment;
      testsuite.testcases = req.body.testcases; // add testcases to suite
      testsuite.updated = Date.now();

      testsuite.save(function (err, testsuite, count) {
        if (err) {
          console.error(err);
        }
        res.json(testsuite);
      });
    });
  },

  /*
   * delete testsuite
   *
   */

  delete: function (req, res) {
    // check :id param
    validator.isPathValid(req, res);

    Testsuite.findOneAndRemove({ '_id': req.params.id }, function (err, testsuite) {
      if (err) {
        console.error(err);
      }
      res.status(204).json(true);
    });
  }
};

export { testsuites }