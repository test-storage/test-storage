var mongoose = require('mongoose');
var util = require('util');
var Testcase = require('../../models/Testcase.js');

var testcases = {

  /* 
   * Get all testcases 
   * 
   */
  getAll: function (req, res) {


    if (req.query.limit) {
      req.checkQuery('limit', 'Invalid param').isInt();
      if (req.query.limit > 200) {
        res.status(400).json('Too many entities requested. Max limit 200 entities.');
        return;
      }
    }

    var errors = req.validationErrors();
    if (errors) {
      res.status(400).json('There have been validation errors: ' + util.inspect(errors));
      return;
    }
   

    Testcase.find({}, {}, { 'limit': parseInt(req.query.limit)}, function (err, testcases) {
      if (err) return err; // TODO check proper error handling
      res.json(testcases);
    });
  },

  /* 
   * Get single testcase 
   * 
   */

  getOne: function (req, res) {
    // TODO check params (id as mongoId)

    // check fields param
    var fields = {};
    if (req.query.fields) {
      if (req.query.fields !== '') {
        var _fields = req.query.fields.split(",");
        console.log("_fields: " + _fields);
        _fields.forEach(function (item, i, _fields) {
          console.log("_field: " + _fields);
          fields[item] = 1;
        });
      }
      fields["_id"] = 0;
      console.log(fields);
    }

  

    // check params
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json('Wrong ID');
      return;
    }



  

    Testcase.findById(req.params.id, fields, function (err, testcase) {
      if (err) return err; // TODO check proper error handling
      res.json(testcase);
    });
  },

  /* 
   * Create testcase 
   * 
   */

  create: function (req, res) {
    Testcase.create(req.body, function (err, testcase) {
      if (err) return err;
      res.status(201).
        location('/api/v1/testcases/' + testcase._id).
        json(testcase);
    });
  },

  /* 
   * Update testcase 
   * 
   */

  update: function (req, res) {
    // TODO need security check (user input) for update

    // check body 
    req.checkBody({
      'name': {
        notEmpty: true,
        errorMessage: 'Name required'
      },
      'description': {
        notEmpty: true,
        errorMessage: 'Name required' // Error message for the parameter 
      },
      'prerequisites': { // 
        optional: true, // won't validate if field is empty 
        isLength: {
          options: [{ min: 2, max: 10 }],
          errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message 
        },
        errorMessage: 'Invalid Prerequisites'
      }
    });

    var errors = req.validationErrors();
    if (errors) {
      res.status(400).json('There have been validation errors: ' + util.inspect(errors));
      return;
    }

    Testcase.findById(req.params.id, function (err, testcase) {
      testcase.parentId = req.body.parentId;
      testcase.name = req.body.name;
      testcase.description = req.body.description;
      testcase.prerequisites = req.body.prerequisites;
      testcase.actual = req.body.actual;
      testcase.expected = req.body.expected;
      testcase.updated = Date.now();

      testcase.save(function (err, testcase, count) {
        if (err) return err; // TODO check proper error handling
        res.json(testcase);
      });
    });
  },

  /* 
   * delete testcase 
   * 
   */

  delete: function (req, res) {
    Testcase.findByIdAndRemove(req.params.id, function (err, testcase) {
      if (err) return err;
      res.json(true);
    });
  }
};

module.exports = testcases;
