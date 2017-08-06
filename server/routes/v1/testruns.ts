import * as mongoose from 'mongoose';
import { Testrun } from '../../models/Testrun';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class Testruns {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }
  /*
   * Get all testruns / GET
   *
   */

  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    Testrun.
      find({}).
      exec(
      function (err, testruns) {
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
            json(testruns);
        }
      });
  }

  /*
   * Get single testrun / GET :id
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    Testrun.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testrun) {
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
            json(testrun);
        }
      });
  }

  /*
   * Create testrun / POST
   *
   */

  create(req, res) {
    // TODO testrun.createdBy = currentUser;
    Testrun.
      create(req.body,
      function (err, testrun) {
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
            location('/api/v1/testruns/' + testrun._id).
            json(testrun);
        }
      });
  }

  /*
   * Update testrun / PUT
   *
   */

  update(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    // TODO need security check (user input) for update
    Testrun.
      findOne({ '_id': req.params.id }).
      exec(
      function (err, testrun) {

        testrun.name = req.body.name;
        testrun.description = req.body.description;
        testrun.projectId = req.body.projectId;
        testrun.builds = req.body.builds;
        testrun.environments = req.body.environments;
        testrun.platforms = req.body.platforms;
        testrun.testcaseSuiteId = req.body.testcaseSuiteId;
        testrun.startDate = req.body.startDate;
        testrun.endDate = req.body.endDate;

        testrun.updated = Date.now();
        // TODO testrun.updatedBy = currentUser;

        testrun.save(function (err, testrun, count) {
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
              json(testrun);
          }
        });
      });
  }

  /*
   * delete testrun
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    Testrun.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, testrun) {
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
