import * as mongoose from 'mongoose';
import { TestResult } from '../../../models/TestResult';

export class TestResultsCollection {
    public getAll(limit, fields, offset, callback) {
        TestResult.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, testResults) {
                callback(err, testResults);
            });
    }

    public getOne(id: string, fields, callback) {
        TestResult.
            findOne({ '_id': id }).
            select(fields).exec(function (err, testResults) {
                callback(err, testResults);
            });
    }

    public create(body, callback) {
        TestResult.
            create(body, function (err, testResult) {
                callback(err, testResult);
            });
    }

    public update(body, id, callback) {
        if (id) {
            TestResult.findOne({ '_id': id }).exec(function (err, testResult) {
                testResult.status = body.status;
                testResult.updated = Date.now();
                // TODO testResult.updatedBy = currentUser;

                testResult.save(function (err, testResult) {
                    callback(err, testResult);
                });
            });
        } else {
            TestResult.create(body, function (err, testResult) {
                callback(err, testResult);
            });
        }
    }

    public delete(id: string, callback) {
        TestResult
            .findOneAndRemove({ '_id': id }).exec(function (err, testResult) {
                callback(err, testResult);
            });
    }
}
