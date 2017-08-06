import * as mongoose from 'mongoose';
import { Testsuite } from '../../models/Testsuite';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class Testsuites {

  private validator: Validator;
  constructor() {
    this.validator = new Validator();
  }

  /*
   * Get all testsuites
   *
   */

  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    Testsuite.
      find({}).
      limit(limit).
      select(fields).
      skip(offset).
      exec(
      function (err, testsuites) {

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
            json(testsuites);
        }
      });
  }

  /*
   * Get single testsuite
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    Testsuite.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testsuite) {

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
            json(testsuite);
        }
      });
  }

  /*
   * Create testsuite
   *
   */

  create(req, res) {
    Testsuite.
      create(req.body,
      function (err, testsuite) {

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
            location('/api/v1/testsuites/' + testsuite._id).
            json(testsuite);
        }
      });
  }

  /*
   * Update testsuite
   *
   */

  update(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

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
              json(testsuite);
          }
        });
      });
  }

  /*
   * delete testsuite
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    Testsuite.
      findOneAndRemove({ '_id': req.params.id })
      .exec(
      function (err, testsuite) {

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

  /*
   * Get all testsuites by project id
   *
   */
  getAllTestsuitesByProjectId(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    // check :id param
    this.validator.isPathValid(req, res);

    Testsuite.
      find({ 'projectId': req.params.id }).
      limit(limit).
      select(fields).
      skip(offset).
      exec(
      function (err, testcases) {

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
            json(testcases);
        }
      });
  }
}
