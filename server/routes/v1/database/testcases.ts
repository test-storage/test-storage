import * as mongoose from 'mongoose';
import { Testcase } from '../../../models/Testcase';

export class TestcasesCollection {

    public getAll(limit, fields, offset, callback) {
        Testcase.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, testcases) {
                callback(err, testcases);
            });
    }

    public getOne(id: string, fields, callback) {
        Testcase.
            findOne({ '_id': id }).
            select(fields).exec(function (err, testcases) {
                callback(err, testcases);
            });
    }

    public create(body, callback) {
        Testcase.
            create(body, function (err, testcase) {
                callback(err, testcase);
            });
    }

    public update(body, id, callback) {
        if (id) {
            Testcase.findOne({ '_id': id }).exec(function (err, testcase) {
                testcase.projectId = body.projectId;
                testcase.testSuiteId = body.testSuiteId;
                testcase.priority = body.priority;
                testcase.order = body.order;
                testcase.title = body.title;
                testcase.description = body.description;
                testcase.preConditions = body.preConditions;
                testcase.steps = body.steps;
                testcase.testData = body.testData;
                testcase.expected = body.expected;
                testcase.postConditions = body.postConditions;
                testcase.tags = body.tags;
                testcase.estimate = body.estimate;
                testcase.enabled = body.enabled;
                testcase.isAutomated = body.isAutomated;
                testcase.status = body.status;
                if (body.status) {
                    // TODO add checks
                    // also "Approved"
                    testcase.status = body.status;
                }
                testcase.updated = Date.now();

                testcase.save(function (err, testcase) {
                    callback(err, testcase);
                });
            });
        } else {
            Testcase.create(body, function (err, testcase) {
                callback(err, testcase);
            });
        }
    }

    public delete(id: string, callback) {
        Testcase
            .findOneAndRemove({ '_id': id }).exec(function (err, testcase) {
                callback(err, testcase);
            });
    }

    public getTestcasesByProjectId(limit, fields, offset, id, callback) {
        Testcase.
            find({ 'projectId': id }).
            limit(limit).
            select(fields).
            skip(offset).
            exec(
            function (err, testcases) {
                callback(err, testcases);
            });
    }
}

