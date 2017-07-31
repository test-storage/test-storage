import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
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
    work: {
        title: { type: String, required: true },
        phone: String,
        company: String
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


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

/*
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

*/

const User = mongoose.model('User', UserSchema);
export { User };
