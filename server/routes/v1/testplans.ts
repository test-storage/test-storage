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
    let limit = {}, offset = {}, fields = {};
    limit['limit'] = validator.validateLimit(req, res);
    fields = validator.validateFields(req, res);

    Testplan.find({}, fields, limit, function (err, testplans) {
      if (err) {
        console.error(err);
      }
      res.json(testplans);
    });
  },

  /*
   * Get single testplan / GET :id
   *
   */

  getOne: function (req, res) {

    // check 'fields' param
    let fields = {};
    fields = validator.validateFields(req, res);
    // check :id param
    validator.isPathValid(req, res);
    // TODO add sanitizers

    Testplan.findOne({ '_id': req.params.id }, fields, function (err, testplan) {
      if (err) {
        console.error(err);
      }
      res.json(testplan);
    });
  },

  /*
   * Create testplan / POST
   *
   */

  create: function (req, res) {
    // TODO testplan.createdBy = currentUser;
    Testplan.create(req.body, function (err, testplan) {
      if (err) {
        console.error(err);
      }
      res.status(201).
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
    Testplan.findOne({ '_id': req.params.id }, function (err, testplan) {

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
        res.json(testplan);
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

    Testplan.findOneAndRemove({ '_id': req.params.id }, function (err, testplan) {
      if (err) {
        console.error(err);
      }
      res.status(204).json(true);
    });
  }
};

export { testplans }
