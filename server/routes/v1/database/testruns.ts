import * as mongoose from 'mongoose';
import { Testrun } from '../../../models/Testrun';

export class TestrunsCollection {
    public getAll(limit, fields, offset, callback) {
        Testrun.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, testruns) {
                callback(err, testruns);
            });
    }

    public getOne(id: string, fields, callback) {
        Testrun.
            findOne({ '_id': id }).
            select(fields).exec(function (err, testruns) {
                callback(err, testruns);
            });
    }

    public create(body, callback) {
        Testrun.
            create(body, function (err, testrun) {
                callback(err, testrun);
            });
    }

    public update(body, id, callback) {
        if (id) {
            Testrun.findOne({ '_id': id }).exec(function (err, testrun) {
                testrun.name = body.name;
                testrun.description = body.description;
                testrun.projectId = body.projectId;
                testrun.builds = body.builds;
                testrun.environments = body.environments;
                testrun.platforms = body.platforms;
                testrun.testcases = body.testcases;
                testrun.status = body.status;
                testrun.startDate = body.startDate;
                testrun.endDate = body.endDate;

                testrun.updated = Date.now();
                // TODO testrun.updatedBy = currentUser;

                testrun.save(function (err, testrun) {
                    callback(err, testrun);
                });
            });
        } else {
            Testrun.create(body, function (err, testrun) {
                callback(err, testrun);
            });
        }
    }

    public delete(id: string, callback) {
        Testrun
            .findOneAndRemove({ '_id': id }).exec(function (err, testrun) {
                callback(err, testrun);
            });
    }
}
