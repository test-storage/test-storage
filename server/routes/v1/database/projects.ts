import * as mongoose from 'mongoose';
import { Project } from '../../../models/Project';

export class ProjectsCollection {

    public getAll(limit, fields, offset, callback) {
        Project.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, projects) {
                callback(err, projects);
            });
    }

    public getOne(id: string, fields, callback) {
        Project.
            findOne({ '_id': id }).
            select(fields).exec(function (err, project) {
                callback(err, project);
            });
    }

    public create(body, callback) {
        Project.
            create(body, function (err, project) {
                callback(err, project);
            });
    }

    public update(body, id, callback) {
        if (id) {
            Project.findOne({ '_id': id }).exec(function (err, project) {
                project.name = body.name;
                project.description = body.description;
                project.enabled = body.enabled;
                project.testcases = body.testcases;
                project.updated = Date.now();
                // project.updatedBy = () => { this.auth.getUserId(req, res); }

                project.save(function (err, project) {
                    callback(err, project);
                });
            });
        } else {
            Project.create(body, function (err, project) {
                callback(err, project);
            });
        }
    }

    public delete(id: string, callback) {
        Project
            .findOneAndRemove({ '_id': id }).exec(function (err, project) {
                callback(err, project);
            });
    }
}
