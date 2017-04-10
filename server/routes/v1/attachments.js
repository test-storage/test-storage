var mongoose = require('mongoose');
var Attachment = require('../../models/Attachment.js');

var multer = require('multer');

var util = require('util');
var limitValidator = require('../../middlewares/validateLimitQueryParam');
var fieldsValidator = require('../../middlewares/validateFieldsQueryParam');
var pathValidator = require('../../middlewares/validateIdPathParam');


// Storage init
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = './uploads';
        cb(null, path);
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
})

var upload = multer({
    storage: storage
}).single('file');


var attachments = {

    /*
     * Get all attachments
     *
     */
    getAll: function (req, res) {

        // check 'limit' param
        var limit = {};
        if (limitValidator.isExist(req)) {
            limitValidator.isInt(req, res);
            limit['limit'] = limitValidator.sanitize(req);
        } else {
            // default limit
            limit['limit'] = 25;
        }

        // check 'fields' param
        var fields = {};
        if (fieldsValidator.isExist(req)) {
            fields = fieldsValidator.parseFields(req)
        }

        Attachment.find({}, fields, limit, function (err, attachments) {
            if (err) return err; // TODO check proper error handling
            res.json(attachments);
        });
    },


    /*
     * Get single attachment
     *
     */

    getOne: function (req, res) {
        // check 'fields' param
        var fields = {};
        if (fieldsValidator.isExist(req)) {
            fields = fieldsValidator.parseFields(req)
        }

        // check :id param
        pathValidator.isIdValid(req, res);
        // TODO add sanitizers

        Attachment.findOne({ "_id": req.params.id }, fields, function (err, attachment) {
            if (err) return err; // TODO check proper error handling
            res.json(attachment);
        });
    },

    /*
       * Create attachment
       *
       */

    create: function (req, res) {
        Attachment.create(req.body, function (err, attachment) {
            if (err) return err;
            res.status(201).
                location('/api/v1/attachments/' + attachment._id).
                json(attachment);
        });
        /*
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null });
            // Everything went fine
        }); */
    },

    /*
     * Update attachment
     *
     */

    update: function (req, res) {
        // path validation
        var pathParam = pathValidator.isIdValid(req, res);
        // TODO need security check (user input) for update
        Attachment.findOne({ "_id": req.params.id }, function (err, attachment) {

            attachment.name = req.body.name;
            attachment.description = req.body.description;
            attachment.updated = Date.now();

            attachment.save(function (err, attachment, count) {
                if (err) return err; // TODO check proper error handling
                res.status(200).json(attachment);
            });
        });
    },

    /*
     * Delete attachment
     *
     */

    delete: function (req, res) {
        // check :id param
        var pathParam = pathValidator.isIdValid(req, res);

        Attachment.findOneAndRemove({ "_id": req.params.id }, function (err, group) {
            if (err) return err;
            res.status(204).json(true);
        });

    }


};

module.exports = attachments;

