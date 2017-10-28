import * as util from 'util';
import { Validator } from '../../middlewares/validate';

import { TestcaseStepsCollection } from './database/testcasesteps';

export class TestcaseSteps {

  private validator: Validator = new Validator();
  private db: TestcaseStepsCollection = new TestcaseStepsCollection();

  /*
   * Get all testcase steps
   *
   */
  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    this.db.getAll(limit, fields, offset, function (err, testcaseSteps) {
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

    this.db.getOne(req.params.id, fields, function (err, testcaseStep) {
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

    this.db.create(req.body, function (err, testcaseStep) {
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


    this.db.update(req.body, req.params.id, function (err, testcaseStep) {
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
   * delete testcase step
   *
   */

  delete(req, res) {

    // check :id param
    this.validator.isPathValid(req, res);

    this.db.delete(req.params.id, function (err, testcaseStep) {
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

    this.db.getTestcasesByTestcaseId(limit, fields, offset, req.params.id, function (err, testcaseSteps) {
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

}
