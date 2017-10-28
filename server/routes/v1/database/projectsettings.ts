import * as mongoose from 'mongoose';
import { ProjectSetting } from '../../../models/ProjectSetting';

export class ProjectSettingsCollection {

    public getOne(id: string, fields, callback) {
        ProjectSetting.
            findOne({ 'projectId': id }).
            select(fields).exec(function (err, setting) {
                callback(err, setting);
            });
    }

    public create(body, callback) {
        ProjectSetting.
            create(body, function (err, setting) {
                callback(err, setting);
            });
    }

    public update(body, id, callback) {
        if (id) {
            ProjectSetting.findOne({ 'projectId': id }).exec(function (err, setting) {
                // TODO

                setting.updated = Date.now();
                // TODO projectsettings.createdBy = currentUser;

                setting.save(function (err, setting) {
                    callback(err, setting);
                });
            });
        } else {
            ProjectSetting.create(body, function (err, setting) {
                callback(err, setting);
            });
        }
    }

    public delete(id: string, callback) {
        ProjectSetting
            .findOneAndRemove({ 'projectId': id }).exec(function (err, setting) {
                callback(err, setting);
            });
    }
}
