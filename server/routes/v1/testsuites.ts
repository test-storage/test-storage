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
    const limit = validator.validateLimit(req, res);
    const fields = validator.validateFields(req, res);
    const offset = validator.validateOffset(req, res);

    Testsuite.
      find({}).
      limit(limit).
      select(fields).
      skip(offset).
      exec(
      function (err, testsuites) {

        if (err) {
          console.error(err);
        }

        res.
          status(200).
          json(testsuites);
      });
  },

  /*
   * Get single testsuite
   *
   */

  getOne: function (req, res) {

    // check 'fields' and ':id' params
    const fields = validator.validateFields(req, res);
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Testsuite.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testsuite) {

        if (err) {
          console.error(err);
        }

        res.
          status(200).
          json(testsuite);
      });
  },

  /*
   * Create testsuite
   *
   */

  create: function (req, res) {
    Testsuite.
      create(req.body,
      function (err, testsuite) {

        if (err) {
          console.error(err);
        }

        res.
          status(201).
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
    Testsuite.
      findOne({ '_id': req.params.id }).
      exec(
      function (err, testsuite) {

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

          res.
            status(200).
            json(testsuite);
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

    Testsuite.
      findOneAndRemove({ '_id': req.params.id })
      .exec(
      function (err, testsuite) {

        if (err) {
          console.error(err);
        }

        res.
          status(204).
          json(true);
      });
  }
};

export { testsuites }
