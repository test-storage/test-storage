import * as mongoose from 'mongoose';
import { Notification } from '../../../models/Notification';

export class NotificationsCollection {
    public getAll(limit, fields, offset, callback) {

        Notification.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, notifications) {
                callback(err, notifications);
            });
    }

    public getOne(id: string, fields, callback) {
        Notification.
            findOne({ '_id': id }).
            select(fields).exec(function (err, notifications) {
                callback(err, notifications);
            });
    }

    public create(body, callback) {
        return Notification.
            create(body, function (err, notifications) {
                callback(err, notifications);
            });
    }

    public update(body, id, callback) {
        if (id) {
            Notification.findOne({ '_id': id }).exec(function (err, notification) {
                notification.title = body.title;
                notification.description = body.description;
                notification.entity = body.entity;
                notification.action = body.action;
                notification.senderId = body.senderId;
                notification.recipientId = body.recipientId;
                notification.updated = Date.now();

                return notification.save(function (err, notification) {
                    callback(err, notification);
                });
            });
        } else {
            return Notification.create(body, function (err, notification) {
                callback(err, notification);
            });
        }
    }

    public delete(id: string, callback) {
        return Notification
            .findOneAndRemove({ '_id': id }).exec(function (err, notification) {
                callback(err, notification);
            });
    }
}
