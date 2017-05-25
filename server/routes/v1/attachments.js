var mongoose = require('mongoose');
var Attachment = require('../../models/Attachment.js');

var multer = require('multer');

var util = require('util');
var validator = require('../../middlewares/validate');


// Storage init
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var path = './server/uploads';
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

        // check limit, offset, fields param
        var limit = {}, offset = {}, fields = {};
        limit['limit'] = validator.validateLimit(req, res);
        fields = validator.validateFields(req, res);

        Attachment.find({}, fields, limit, function (err, attachments) {
            if (err) {
                console.error(err);
            }
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
        fields = validator.validateFields(req, res);
        // check :id param
        validator.isPathValid(req, res);
        // TODO add sanitizers

        Attachment.findOne({ "_id": req.params.id }, fields, function (err, attachment) {
            if (err) {
                console.error(err);
            }
            res.json(attachment);
        });
    },

    /*
       * Create attachment
       *
       */

    create: function (req, res) {
        Attachment.create(req.body, function (err, attachment) {
            if (err) {
                console.error(err);
            }
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
        validator.isPathValid(req, res);
        // TODO need security check (user input) for update
        Attachment.findOne({ "_id": req.params.id }, function (err, attachment) {

            attachment.name = req.body.name;
            attachment.description = req.body.description;
            attachment.updated = Date.now();

            attachment.save(function (err, attachment, count) {
                if (err) {
                    console.error(err);
                }
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
        validator.isPathValid(req, res);

        Attachment.findOneAndRemove({ "_id": req.params.id }, function (err, group) {
            if (err) {
                console.error(err);
            }
            res.status(204).json(true);
        });

    }
};

module.exports = attachments;

