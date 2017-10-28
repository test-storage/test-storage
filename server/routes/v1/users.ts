import * as util from 'util';
import { Validator } from '../../middlewares/validate';

import * as jwt from 'jsonwebtoken';
import { secret } from '../config/secret';

import { UsersCollection } from './database/users';

export class Users {

    private validator: Validator = new Validator();
    private db: UsersCollection = new UsersCollection();

    /*
     * Get all users
     *
     */
    getAll(req, res) {

        // check limit, offset, fields param
        const limit = this.validator.validateLimit(req, res);
        const fields = this.validator.validateFields(req, res);
        const offset = this.validator.validateOffset(req, res);

        this.db.getAll(limit, fields, offset, function (err, users) {
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

                // delete password from data array
                users.map(function (props) {
                    props.password = undefined;
                    return true;
                });

                res.
                    set('Content-Type', 'application/json').
                    status(200).
                    json(users);
            }

        });

    }

    /*
     * Get single user
     *
     */

    getOne(req, res) {

        // check 'fields' and ':id' params
        const fields = this.validator.validateFields(req, res);
        this.validator.isPathValid(req, res);
        // TODO add sanitizers

        this.db.getOne(req.params.id, fields, function (err, user) {
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

                // delete password from data object
                user.password = undefined;


                res.
                    set('Content-Type', 'application/json').
                    status(200).
                    json(user);
            }

        });
    }

    /*
     * Create user
     *
     */

    create(req, res) {
        // TODO check body data
        this.db.create(req.body, function (err, user) {
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

                // delete password from data object
                user.password = undefined;

                res.
                    set('Content-Type', 'application/json').
                    status(201).
                    location('/api/v1/users/' + user._id).
                    json(user);
            }
        });

    }

    /*
     * Update user
     *
     */

    update(req, res) {

        const fields = ' -password';
        // check :id param
        this.validator.isPathValid(req, res);

        // TODO need security check (user input) for update
        this.db.update(req.body, req.params.id, function (err, user) {
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

                // delete password from data object
                user.password = undefined;

                res.
                    set('Content-Type', 'application/json').
                    status(200).
                    json(user);
            }
        });
    }

    /*
     * delete user
     *
     */

    delete(req, res) {
        // check :id param
        this.validator.isPathValid(req, res);

        this.db.delete(req.params.id, function (err, user) {
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


    /*
     * Get single user (me)
     *
     */

    getUserMe(req, res) {

        // check 'fields'
        const fields = this.validator.validateFields(req, res);
        // TODO add sanitizers

        const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (token) {
            try {
                const decoded = jwt.decode(token, secret(), { algorithm: 'HS256' });

                this.db.getUsersMe(decoded.username, fields, function (err, user) {
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

                        // delete password from data object
                        user.password = undefined;

                        res.
                            set('Content-Type', 'application/json').
                            status(200).
                            json(user);
                    }

                });
            } catch (err) {
                res.status(500);
                res.json({
                    'status': 500,
                    'message': 'Oops something went wrong',
                    'error': '' + err
                });
            }
        }
    }

    /*
   * Get all users by project id
   *
   */
    getAllUsersByProjectId(req, res) {

        // check limit, offset, fields param
        const limit = this.validator.validateLimit(req, res);
        const fields = this.validator.validateFields(req, res);
        const offset = this.validator.validateOffset(req, res);

        // check :id param
        this.validator.isPathValid(req, res);

        this.db.getUsersByProjectId(limit, fields, offset, req.params.id, function (err, users) {
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
                // delete password from data array
                users.map(function (props) {
                    props.password = undefined;
                    return true;
                });

                res.
                    set('Content-Type', 'application/json').
                    status(200).
                    json(users);
            }
        });
    }
}
