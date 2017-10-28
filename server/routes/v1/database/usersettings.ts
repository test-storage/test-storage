import * as mongoose from 'mongoose';
import { UserSetting } from '../../../models/UserSetting';

export class UserSettingsCollection {

    public getOne(id: string, fields, callback) {
        UserSetting.
            findOne({ 'userId': id }).
            select(fields).exec(function (err, setting) {
                callback(err, setting);
            });
    }

    public create(body, callback) {
        UserSetting.
            create(body, function (err, setting) {
                callback(err, setting);
            });
    }

    public update(body, id, callback) {
        if (id) {
            UserSetting.findOne({ 'userId': id }).exec(function (err, setting) {
                setting.theme = body.theme;
                setting.language = body.language;
                setting.updated = Date.now();
                // TODO setting.updatedBy = currentUser;

                setting.save(function (err, setting) {
                    callback(err, setting);
                });
            });
        } else {
            UserSetting.create(body, function (err, setting) {
                callback(err, setting);
            });
        }
    }

    public delete(id: string, callback) {
        UserSetting
            .findOneAndRemove({ 'userId': id }).exec(function (err, setting) {
                callback(err, setting);
            });
    }
}
