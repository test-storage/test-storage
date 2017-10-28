import * as mongoose from 'mongoose';
import { UserGroup } from '../../../models/UserGroup';

export class UserGroupsCollection {

    public getAll(limit, fields, offset, callback) {
        UserGroup.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, groups) {
                callback(err, groups);
            });
    }

    public getOne(id: string, fields, callback) {
        UserGroup.
            findOne({ '_id': id }).
            select(fields).exec(function (err, group) {
                callback(err, group);
            });
    }

    public create(body, callback) {
        UserGroup.
            create(body, function (err, group) {
                callback(err, group);
            });
    }

    public update(body, id, callback) {
        if (id) {
            UserGroup.findOne({ '_id': id }).exec(function (err, group) {
                group.name = body.name;
                group.description = body.description;
                group.enabled = body.enabled;
                group.scope = body.scope;
                //  group.scope.testsuites = body.scope.testsuites;
                group.users = body.users; // add users
                group.updated = Date.now();

                group.save(function (err, group) {
                    callback(err, group);
                });
            });
        } else {
            UserGroup.create(body, function (err, group) {
                callback(err, group);
            });
        }
    }

    public delete(id: string, callback) {
        UserGroup
            .findOneAndRemove({ '_id': id }).exec(function (err, group) {
                callback(err, group);
            });
    }

    public getUsersMe(username, fields, callback) {
        UserGroup.
            findOne({ 'email': username }, fields).
            exec(
            function (err, group) {
                callback(err, group);
            });
    }

    public getUsersByProjectId(limit, fields, offset, id, callback) {
        UserGroup.
            find({ 'projects': id }).
            limit(limit).
            select(fields).
            skip(offset).
            exec(
            function (err, groups) {
                callback(err, groups);
            });
    }
}
