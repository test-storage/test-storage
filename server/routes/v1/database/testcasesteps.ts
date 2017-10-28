import * as mongoose from 'mongoose';
import { TestcaseStep } from '../../../models/TestcaseStep';

export class TestcaseStepsCollection {

    public getAll(limit, fields, offset, callback) {
        TestcaseStep.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, testcaseSteps) {
                callback(err, testcaseSteps);
            });
    }

    public getOne(id: string, fields, callback) {
        TestcaseStep.
            findOne({ '_id': id }).
            select(fields).exec(function (err, testcaseStep) {
                callback(err, testcaseStep);
            });
    }

    public create(body, callback) {
        TestcaseStep.
            create(body, function (err, testcaseStep) {
                callback(err, testcaseStep);
            });
    }

    public update(body, id, callback) {
        if (id) {
            TestcaseStep.findOne({ '_id': id }).exec(function (err, testcaseStep) {
                testcaseStep.projectId = body.projectId;
                testcaseStep.testSuiteId = body.testSuiteId;

                testcaseStep.testcaseId = body.testcaseId;
                testcaseStep.order = body.order;
                testcaseStep.action = body.action;
                testcaseStep.testData = body.testData;
                testcaseStep.expected = body.expected;
                testcaseStep.enabled = body.enabled;
                testcaseStep.executionType = body.executionType;

                testcaseStep.updated = Date.now();


                testcaseStep.save(function (err, testcaseStep) {
                    callback(err, testcaseStep);
                });
            });
        } else {
            TestcaseStep.create(body, function (err, testcaseStep) {
                callback(err, testcaseStep);
            });
        }
    }

    public delete(id: string, callback) {
        TestcaseStep
            .findOneAndRemove({ '_id': id }).exec(function (err, testcaseStep) {
                callback(err, testcaseStep);
            });
    }

    public getTestcasesByTestcaseId(limit, fields, offset, id, callback) {
        TestcaseStep.
            find({ 'testcaseId': id }).
            limit(limit).
            select(fields).
            skip(offset).
            exec(
            function (err, testcases) {
                callback(err, testcases);
            });
    }

}
