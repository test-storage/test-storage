import * as mongoose from 'mongoose';
import { Testplan } from '../../../models/Testplan';

export class TestplansCollection {

    public getAll(limit, fields, offset, callback) {
        Testplan.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, testplans) {
                callback(err, testplans);
            });
    }

    public getOne(id: string, fields, callback) {
        Testplan.
            findOne({ '_id': id }).
            select(fields).exec(function (err, testplans) {
                callback(err, testplans);
            });
    }

    public create(body, callback) {
        Testplan.
            create(body, function (err, testplan) {
                callback(err, testplan);
            });
    }

    public update(body, id, callback) {
        if (id) {
            Testplan.findOne({ '_id': id }).exec(function (err, testplan) {
                testplan.name = body.name;
                testplan.description = body.description;
                testplan.projectId = body.projectId;
                testplan.builds = body.builds;
                testplan.environments = body.environments;
                testplan.platforms = body.platforms;
                testplan.testcases = body.testcases;
                testplan.status = body.status;
                testplan.startDate = body.startDate;
                testplan.endDate = body.endDate;

                testplan.updated = Date.now();
                // TODO testplan.updatedBy = currentUser;

                testplan.save(function (err, testplan) {
                    callback(err, testplan);
                });
            });
        } else {
            Testplan.create(body, function (err, testplan) {
                callback(err, testplan);
            });
        }
    }

    public delete(id: string, callback) {
        Testplan
            .findOneAndRemove({ '_id': id }).exec(function (err, testplan) {
                callback(err, testplan);
            });
    }
}
