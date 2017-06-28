import * as mongoose from 'mongoose';
import { Testcase } from '../../models/Testcase';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class Testcases {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }
  /*
   * Get all testcases
   *
   */
  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    Testcase.
      find({}).
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

  /*
   * Get single testcase
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    Testcase.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testcase) {

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
            json(testcase);
        }
      });
  }

  /*
   * Create testcase
   *
   */

  create(req, res) {
    // TODO add validation

    Testcase.
      create(req.body,
      function (err, testcase) {

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
            location('/api/v1/testcases/' + testcase._id).
            json(testcase);
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

    // check body
    req.checkBody({
      'title': {
        notEmpty: true,
        errorMessage: 'title required'
      },
      'description': {
        notEmpty: true,
        errorMessage: 'description required' // Error message for the parameter
      },
      'preConditions': { //
        optional: true, // won't validate if field is empty
        isLength: {
          options: [{ min: 2, max: 250 }],
          errorMessage: 'Must be between 2 and 250 chars long' // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: 'Invalid Preconditions'
      }
    });

    const errors = req.validationErrors();
    if (errors) {
      res.
        // set('Content-Type', 'application/json').
        status(400).
        json('There have been validation errors: ' + util.inspect(errors));
      return;
    }

    Testcase.
      findOne({ '_id': req.params.id }).
      exec(
      function (err, testcase) {
        if (!req.body.id) {
          // TODO creation logic
          // + add id, created, createdBy and etc
        }
        testcase.projectId = req.body.projectId;
        testcase.testSuiteId = req.body.testSuiteId;
        testcase.priority = req.body.priority;
        testcase.order = req.body.order;
        testcase.title = req.body.title;
        testcase.description = req.body.description;
        testcase.preConditions = req.body.preConditions;
        testcase.steps = req.body.steps;
        testcase.testData = req.body.testData;
        testcase.expected = req.body.expected;
        testcase.postConditions = req.body.postConditions;
        testcase.tags = req.body.tags;
        testcase.estimate = req.body.estimate;
        if (req.body.status) {
          // TODO add checks
          // also "Approved"
          testcase.status = req.body.status;
        }
        testcase.updated = Date.now();

        testcase.save(function (err, testcase, count) {

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
              json(testcase);
          }
        });
      });
  }

  /*
   * delete testcase
   *
   */

  delete(req, res) {

    // check :id param
    this.validator.isPathValid(req, res);

    Testcase.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, testcase) {

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
   * Get all testcases by project id
   *
   */
  getAllTestcasesByProjectId(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    // check :id param
    this.validator.isPathValid(req, res);

    Testcase.
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
};
