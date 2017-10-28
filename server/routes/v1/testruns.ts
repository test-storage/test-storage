import * as util from 'util';
import { Validator } from '../../middlewares/validate';

import { TestrunsCollection } from './database/testruns';

export class Testruns {

  private validator: Validator = new Validator();
  private db: TestrunsCollection = new TestrunsCollection();

  /*
   * Get all testruns / GET
   *
   */

  getAll(req, res) {

    // check limit, offset, fields param
    const limit = this.validator.validateLimit(req, res);
    const fields = this.validator.validateFields(req, res);
    const offset = this.validator.validateOffset(req, res);

    this.db.getAll(limit, fields, offset, function (err, testruns) {
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

    this.db.getOne(req.params.id, fields, function (err, testrun) {
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
    this.db.create(req.body, function (err, testrun) {
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
    this.db.update(req.body, req.params.id, function (err, testrun) {
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
   * delete testrun
   *
   */

  delete(req, res) {
    // check :id param
    this.validator.isPathValid(req, res);

    this.db.delete(req.params.id, function (err, testrun) {
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
