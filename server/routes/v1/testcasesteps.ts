import * as mongoose from 'mongoose';
import { TestcaseStep } from '../../models/TestcaseStep';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class TestcaseSteps {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }
  /*
   * Get all testcase steps
   *
   */
  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    TestcaseStep.
      find({}).
      limit(limit).
      select(fields).
      skip(offset).
      exec(
      function (err, testcaseSteps) {

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
            json(testcaseSteps);
        }
      });
  }

  /*
   * Get single testcase step
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    TestcaseStep.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testcaseStep) {

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
            json(testcaseStep);
        }
      });
  }

  /*
   * Create testcase step
   *
   */

  create(req, res) {
    // TODO add validation

    TestcaseStep.
      create(req.body,
      function (err, testcaseStep) {

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
            location('/api/v1/steps/' + testcaseStep._id).
            json(testcaseStep);
        }
      });
  }

  /*
   * Update testcase
   *
   */

  update(req, res) {
    // TODO need security check (user input) for update

    // check :id param
    this.validator.isPathValid(req, res);


    TestcaseStep.
      findOne({ '_id': req.params.id }).
      exec(
      function (err, testcaseStep) {
        if (!req.body.id) {
          // TODO creation logic
          // + add id, created, createdBy and etc
        }
        testcaseStep.projectId = req.body.projectId;
        testcaseStep.testSuiteId = req.body.testSuiteId;

        testcaseStep.testcaseId = req.body.testcaseId;
        testcaseStep.order = req.body.order;
        testcaseStep.action = req.body.action;
        testcaseStep.testData = req.body.testData;
        testcaseStep.expected = req.body.expected;
        testcaseStep.enabled = req.body.enabled;
        testcaseStep.executionType = req.body.executionType;

        testcaseStep.updated = Date.now();

        testcaseStep.save(function (err, step, count) {

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
              json(step);
          }
        });
      });
  }

  /*
   * delete testcase step
   *
   */

  delete(req, res) {

    // check :id param
    this.validator.isPathValid(req, res);

    TestcaseStep.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, testcaseStep) {

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
            status(204)
            .json(true);
        }
      });
  }


  /*
   * Get all testcase steps by testcase id
   *
   */
  getAllTestcaseStepsByTestcaseId(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    // check :id param
    this.validator.isPathValid(req, res);

    TestcaseStep.
      find({ 'testcaseId': req.params.id }).
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
