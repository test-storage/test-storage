import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const NotificationSchema = new mongoose.Schema({
    _id: {
        type: String, unique: true,
        default: function () {
            return crypto.randomBytes(16).toString('hex');
        }
    },
    title: { type: String, required: true },
    description: String,
    entity: String, // TODO ENUM
    action: String, // TODO ENUM
    senderId: String,
    recipientId: String,
    read: Boolean,
    created: { type: Date, required: true, default: Date.now },
    updated: { type: Date, required: true, default: Date.now },
    createdBy: String,
    updatedBy: String
});

const Notification = mongoose.model('Notification', NotificationSchema);
export { Notification };
