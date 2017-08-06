import * as mongoose from 'mongoose';
import { Attachment } from '../../models/Attachment';

import * as multer from 'multer';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';


export class Attachments {

    private validator: Validator;

    constructor() {
        this.validator = new Validator();


        // Storage init
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const path = '../../server/uploads';
                cb(null, path);
            },
            filename: function (req, file, cb) {
                const datetimestamp = Date.now();
                cb(null, file.fieldname + '-' + datetimestamp + '.' +
                    file.originalname.split('.')[file.originalname.split('.').length - 1]);
            }
        });

        var upload = multer({
            storage: storage
        }).single('file');
    }

    /*
     * Get all attachments
     *
     */
    getAll(req, res) {

        // check limit, offset, fields param
        const limit = this.validator.validateLimit(req, res);
        const fields = this.validator.validateFields(req, res);
        const offset = this.validator.validateOffset(req, res);

        Attachment.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(
            function (err, attachments) {

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
                        json(attachments);
                }
            });
    }


    /*
     * Get single attachment
     *
     */

    getOne(req, res) {

        // check 'fields' and ':id' params
        const fields = this.validator.validateFields(req, res);
        this.validator.isPathValid(req, res);
        // TODO add sanitizers

        Attachment.
            findOne({ '_id': req.params.id }).
            select(fields).
            exec(
            function (err, attachment) {

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
                        json(attachment);
                }
            });
    }

    /*
       * Create attachment
       *
       */

    create(req, res) {
        Attachment.create(req.body, function (err, attachment) {
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
                    location('/api/v1/attachments/' + attachment._id).
                    json(attachment);
            }
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
    }

    /*
     * Update attachment
     *
     */

    update(req, res) {
        // path validation
        this.validator.isPathValid(req, res);
        // TODO need security check (user input) for update
        Attachment.findOne({ '_id': req.params.id }, function (err, attachment) {

            attachment.name = req.body.name;
            attachment.description = req.body.description;
            attachment.updated = Date.now();

            attachment.save(function (err, attachment, count) {
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
                        json(attachment);
                }
            });
        });
    }

    /*
     * Delete attachment
     *
     */

    delete(req, res) {
        // check :id param
        this.validator.isPathValid(req, res);

        Attachment.findOneAndRemove({ '_id': req.params.id }, function (err, group) {
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
