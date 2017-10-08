import * as mongoose from 'mongoose';
import { Testsuite } from '../../../models/Testsuite';

export class TestsuitesCollection {

    public getAll(limit, fields, offset, callback) {
        Testsuite.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, testsuites) {
                callback(err, testsuites);
            });
    }

    public getOne(id: string, fields, callback) {
        Testsuite.
            findOne({ '_id': id }).
            select(fields).exec(function (err, testsuites) {
                callback(err, testsuites);
            });
    }

    public create(body, callback) {
        Testsuite.
            create(body, function (err, testsuite) {
                callback(err, testsuite);
            });
    }

    public update(body, id, callback) {
        if (id) {
            Testsuite.findOne({ '_id': id }).exec(function (err, testsuite) {
                testsuite.parentId = body.parentId;
                testsuite.enabled = body.enabled;
                testsuite.name = body.name;
                testsuite.description = body.description;
                testsuite.prerequisites = body.prerequisites;
                testsuite.environment = body.environment;
                testsuite.testcases = body.testcases; // add testcases to suite
                testsuite.updated = Date.now();

                testsuite.save(function (err, testsuite) {
                    callback(err, testsuite);
                });
            });
        } else {
            Testsuite.create(body, function (err, testsuite) {
                callback(err, testsuite);
            });
        }
    }

    public delete(id: string, callback) {
        Testsuite
            .findOneAndRemove({ '_id': id }).exec(function (err, testsuite) {
                callback(err, testsuite);
            });
    }

    public getTestsuitesByProjectId(limit, fields, offset, id, callback) {
        Testsuite.
            find({ 'projectId': id }).
            limit(limit).
            select(fields).
            skip(offset).
            exec(
            function (err, testsuites) {
                callback(err, testsuites);
            });
    }
}
