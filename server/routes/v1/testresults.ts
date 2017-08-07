import * as mongoose from 'mongoose';
import { TestResult } from '../../models/TestResult';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class TestResults {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }
  /*
   * Get all test result / GET
   *
   */

  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    TestResult.
      find({}).
      exec(
      function (err, testresults) {
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
            json(testresults);
        }
      });
  }

  /*
   * Get single test result / GET :id
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    TestResult.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testresult) {
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
            json(testresult);
        }
      });
  }

  /*
   * Create test result / POST
   *
   */

  create(req, res) {
    // TODO testresult.createdBy = currentUser;
    TestResult.
      create(req.body,
      function (err, testresult) {
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
            location('/api/v1/testresults/' + testresult._id).
            json(testresult);
        }
      });
  }

  /*
   * Update test result / PUT
   *
   */

  update(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    TestResult.
      findOne({ '_id': req.params.id }).
      exec(
      function (err, testresult) {

        testresult.status = req.body.status;

        testresult.updated = Date.now();
        // TODO testresult.updatedBy = currentUser;

        testresult.save(function (err, testresult, count) {
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
              json(testresult);
          }
        });
      });
  }

  /*
   * delete testresult
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    TestResult.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, testresult) {
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
