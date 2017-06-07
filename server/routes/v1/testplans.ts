import * as mongoose from 'mongoose';
import { Testplan } from '../../models/Testplan';

import * as util from 'util';
import { validator } from '../../middlewares/validate';

const testplans = {

  /*
   * Get all testplans / GET
   *
   */

  getAll: function (req, res) {

    // check limit, offset, fields param
    const limit = validator.validateLimit(req, res);
    const fields = validator.validateFields(req, res);
    const offset = validator.validateOffset(req, res);

    Testplan.
      find({}).
      exec(
      function (err, testplans) {
        if (err) {
          console.error(err);
        }
        res.
          status(200).
          json(testplans);
      });
  },

  /*
   * Get single testplan / GET :id
   *
   */

  getOne: function (req, res) {

    // check 'fields' and ':id' params
    const fields = validator.validateFields(req, res);
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Testplan.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testplan) {
        if (err) {
          console.error(err);
        }
        res.
          status(200).
          json(testplan);
      });
  },

  /*
   * Create testplan / POST
   *
   */

  create: function (req, res) {
    // TODO testplan.createdBy = currentUser;
    Testplan.
      create(req.body,
      function (err, testplan) {
        if (err) {
          console.error(err);
        }
        res.
          status(201).
          location('/api/v1/testplans/' + testplan._id).
          json(testplan);
      });
  },

  /*
   * Update testplan / PUT
   *
   */

  update: function (req, res) {
    // check :id param
    validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    Testplan.
      findOne({ '_id': req.params.id }).
      exec(
      function (err, testplan) {

        testplan.name = req.body.name;
        testplan.description = req.body.description;
        testplan.builds = req.body.builds;
        //   testplan.configurations = req.body.configurations;
        testplan.environments = req.body.environments;
        testplan.testruns = req.body.testruns;
        testplan.updated = Date.now();
        // TODO testplan.updatedBy = currentUser;

        testplan.save(function (err, testplan, count) {
          if (err) {
            console.error(err);
          }

          res.
            status(200).
            json(testplan);
        });
      });
  },

  /*
   * delete testplan
   *
   */

  delete: function (req, res) {
    // check :id param
    validator.isPathValid(req, res);

    Testplan.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, testplan) {
        if (err) {
          console.error(err);
        }

        res.
          status(204).
          json(true);
      });
  }
};

export { testplans }
