import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

export const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: function () {
            return crypto.randomBytes(16).toString('hex');
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: String,
    workInfo: {
        jobTitle: { type: String, required: true },
        phoneNumber: String,
        companyName: String
    },
    social: {
        skype: String,
        github: String,
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        vk: String
    },
    userGroups: Array,
    projects: Array,
    created: { type: Date, required: true, default: Date.now },
    updated: { type: Date, required: true, default: Date.now },
    createdBy: String,
    updatedBy: String
});
