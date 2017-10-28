import * as mongoose from 'mongoose';
import { Attachment } from '../../../models/Attachment';

export class AttachmentsCollection {

    public getAll(limit, fields, offset, callback) {

        Attachment.
            find({}).
            limit(limit).
            select(fields).
            skip(offset).
            exec(function (err, attachments) {
                callback(err, attachments);
            });
    }

    public getOne(id, fields, callback) {
        Attachment.
            findOne({ '_id': id }).
            select(fields).
            exec(function (err, attachment) {
                callback(err, attachment);
            });
    }

    public create(body, callback) {
        Attachment.create(body, function (err, attachment) {
            callback(err, attachment);
        });
    }

    public update(body, id, callback) {
        if (id) {
            Attachment.findOne({ '_id': id }).exec(function (err, attachment) {
                attachment.name = body.name;
                attachment.description = body.description;
                attachment.updated = Date.now();

                attachment.save(function (err, attachment) {
                    callback(err, attachment);
                });
            });
        } else {
            Attachment.create(body, function (err, attachment) {
                callback(err, attachment);
            });
        }
    }

    public delete(id, callback) {
        Attachment.findOneAndRemove({ '_id': id }).exec(function (err, attachment) {
            callback(err, attachment);
        });
    }
}
