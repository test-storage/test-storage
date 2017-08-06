import * as mongoose from 'mongoose';
import { Notification } from '../../models/Notification';

import * as util from 'util';
import { Validator } from '../../middlewares/validate';

export class Notifications {

    private validator: Validator;

    constructor() {
        this.validator = new Validator();
    }
    /*
     * Get all notifications
     *
     */
    getAll(req, res) {

        // check limit, offset, fields param
        const limit = this.validator.validateLimit(req, res);
        const fields = this.validator.validateFields(req, res);
        const offset = this.validator.validateOffset(req, res);

        Notification.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(
            function (err, notifications) {

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
                        json(notifications);
                }
            });
    }

    /*
     * Get single notification
     *
     */

    getOne(req, res) {

        // check 'fields' and ':id' params
        const fields = this.validator.validateFields(req, res);
        this.validator.isPathValid(req, res);
        // TODO add sanitizers

        Notification.
            findOne({ '_id': req.params.id }).
            select(fields).
            exec(
            function (err, notification) {

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
                        json(notification);
                }
            });
    }

    /*
     * Create notification
     *
     */

    create(req, res) {
        // TODO add validation

        Notification.
            create(req.body,
            function (err, notification) {

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
                        location('/api/v1/notifications/' + notification._id).
                        json(notification);
                }
            });
    }

    /*
     * Update notification
     *
     */

    update(req, res) {
        // TODO need security check (user input) for update

        // check :id param
        this.validator.isPathValid(req, res);

        // TODO check body

        Notification.
            findOne({ '_id': req.params.id }).
            exec(
            function (err, notification) {
                if (!req.body.id) {
                    // TODO creation logic
                    // + add id, created, createdBy and etc
                }

                notification.title = req.body.title;
                notification.description = req.body.description;
                notification.entity = req.body.entity;
                notification.action = req.body.action;
                notification.senderId = req.body.senderId;
                notification.recipientId = req.body.recipientId;
                notification.updated = Date.now();

                notification.save(function (err, notification, count) {

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
                            json(notification);
                    }
                });
            });
    }

    /*
     * delete notification
     *
     */

    delete(req, res) {

        // check :id param
        this.validator.isPathValid(req, res);

        Notification.
            findOneAndRemove({ '_id': req.params.id }).
            exec(
            function (err, notification) {

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
}
