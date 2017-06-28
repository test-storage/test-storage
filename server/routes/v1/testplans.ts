import * as mongoose from 'mongoose';
import { Testplan } from '../../models/Testplan';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class Testplans {

  private validator: Validator;

  constructor() {
    this.validator = new Validator();
  }
  /*
   * Get all testplans / GET
   *
   */

  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    Testplan.
      find({}).
      exec(
      function (err, testplans) {
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
            json(testplans);
        }
      });
  }

  /*
   * Get single testplan / GET :id
   *
   */

  getOne(req, res) {

    // check 'fields' and ':id' params
    const fields = this.validator.validateFields(req, res);
    this.validator.isPathValid(req, res);
    // TODO add sanitizers

    Testplan.
      findOne({ '_id': req.params.id }).
      select(fields).
      exec(
      function (err, testplan) {
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
            json(testplan);
        }
      });
  }

  /*
   * Create testplan / POST
   *
   */

  create(req, res) {
    // TODO testplan.createdBy = currentUser;
    Testplan.
      create(req.body,
      function (err, testplan) {
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
            location('/api/v1/testplans/' + testplan._id).
            json(testplan);
        }
      });
  }

  /*
   * Update testplan / PUT
   *
   */

  update(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

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
              json(testplan);
          }
        });
      });
  }

  /*
   * delete testplan
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    Testplan.
      findOneAndRemove({ '_id': req.params.id }).
      exec(
      function (err, testplan) {
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
};
