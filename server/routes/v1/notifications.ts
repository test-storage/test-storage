import * as util from 'util';
import { Validator } from '../../middlewares/validate';

import { NotificationsCollection } from './database/notifications';

export class Notifications {

    private validator: Validator = new Validator();
    private db: NotificationsCollection = new NotificationsCollection();

    /*
     * Get all notifications
     *
     */
    getAll(req, res) {

        // check limit, offset, fields param
        const limit = this.validator.validateLimit(req, res);
        const fields = this.validator.validateFields(req, res);
        const offset = this.validator.validateOffset(req, res);

        this.db.getAll(limit, fields, offset, function (err, notifications) {
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

        this.db.getOne(req.params.id, fields, function (err, notification) {
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

        this.db.create(req.body, function (err, notification) {
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

        this.db.update(req.body, req.param.id, function (err, notification, count) {

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
     * delete notification
     *
     */

    delete(req, res) {

        // check :id param
        this.validator.isPathValid(req, res);

        this.db.delete(req.params.id, function (err, notification) {
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
