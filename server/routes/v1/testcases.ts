import * as util from 'util';
import { Validator } from '../../middlewares/validate';

import { TestcasesCollection } from './database/testcases';

export class Testcases {

  private validator: Validator = new Validator();
  private db: TestcasesCollection = new TestcasesCollection();

  /*
   * Get all testcases
   *
   */
  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    this.db.getAll(limit, fields, offset, function (err, testcases) {
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

    this.db.getOne(req.params.id, fields, function (err, testcase) {
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
    this.db.create(req.body, function (err, testcase) {
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

    this.db.update(req.body, req.params.id, function (err, testcase) {
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
   * delete testcase
   *
   */

  delete(req, res) {

    // check :id param
    this.validator.isPathValid(req, res);

    this.db.delete(req.params.id, function (err, testcase) {
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

    this.db.getTestcasesByProjectId(limit, fields, offset, req.params.id, function (err, testcases) {
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
