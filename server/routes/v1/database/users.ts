import * as mongoose from 'mongoose';
import { User } from '../../../models/User';

export class UsersCollection {

    public getAll(limit, fields, offset, callback) {
        User.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, users) {
                callback(err, users);
            });
    }

    public getOne(id: string, fields, callback) {
        User.
            findOne({ '_id': id }).
            select(fields).exec(function (err, user) {
                callback(err, user);
            });
    }

    public create(body, callback) {
        User.
            create(body, function (err, user) {
                callback(err, user);
            });
    }

    public update(body, id, callback) {
        if (id) {
            User.findOne({ '_id': id }).exec(function (err, user) {
                user.firstName = body.firstName;
                user.lastName = body.lastName;
                user.email = body.email;
                user.password = body.password;
                user.workInfo = body.workInfo;
                user.social = body.social;
                user.userGroups = body.userGroups;
                user.projects = body.projects;
                user.updated = Date.now();

                user.save(function (err, user) {
                    callback(err, user);
                });
            });
        } else {
            User.create(body, function (err, user) {
                callback(err, user);
            });
        }
    }

    public delete(id: string, callback) {
        User
            .findOneAndRemove({ '_id': id }).exec(function (err, user) {
                callback(err, user);
            });
    }

    public getUsersMe(username, fields, callback) {
        User.
            findOne({ 'email': username }, fields).
            exec(
            function (err, user) {
                callback(err, user);
            });
    }

    public getUsersByProjectId(limit, fields, offset, id, callback) {
        User.
            find({ 'projects': id }).
            limit(limit).
            select(fields).
            skip(offset).
            exec(
            function (err, users) {
                callback(err, users);
            });
    }
}
