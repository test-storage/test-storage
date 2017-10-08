import { Request, Response, NextFunction } from 'express';
import * as multer from 'multer';

import { AttachmentsCollection } from './database/attachments';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';


export class Attachments {

    private validator: Validator = new Validator();
    private db: AttachmentsCollection = new AttachmentsCollection();

    constructor() {
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
    public getAll(req: Request, res: Response, next?: NextFunction) {

        // check limit, offset, fields param
        const limit = this.validator.validateLimit(req, res);
        const fields = this.validator.validateFields(req, res);
        const offset = this.validator.validateOffset(req, res);

        this.db.getAll(limit, fields, offset, function (err, attachments) {
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

    public getOne(req: Request, res: Response, next?: NextFunction) {

        // check 'fields' and ':id' params
        const fields = this.validator.validateFields(req, res);
        this.validator.isPathValid(req, res);
        // TODO add sanitizers

        this.db.getOne(req.params.id, fields, function (err, attachment) {
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

    create(req: Request, res: Response, next?: NextFunction) {

        this.db.create(req.body, function (err, attachment) {
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

    update(req: Request, res: Response, next?: NextFunction) {
        // path validation
        this.validator.isPathValid(req, res);
        // TODO need security check (user input) for update
        this.db.update(req.body, req.params.id, function (err, attachment) {

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
     * Delete attachment
     *
     */

    delete(req: Request, res: Response, next?: NextFunction) {
        // check :id param
        this.validator.isPathValid(req, res);

        this.db.delete(req.params.id, function (err, group) {
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
