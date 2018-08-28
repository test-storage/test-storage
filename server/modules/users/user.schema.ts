import { Schema } from 'mongoose';
import { randomBytes } from 'crypto';
import { genSalt, hash } from 'bcrypt';

export const UserSchema = new Schema({
  _id: {
    type: String,
    default: function () {
      return randomBytes(16).toString('hex');
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
  active: Boolean,
  photo: String,
  avatarColor: Number,
  workInfo: {
    jobTitle: { type: String },
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
  role: String,
  userGroups: Array,
  projects: Array,
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  createdBy: String,
  updatedBy: String
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      hash(user.password, salt, function (error, passwordHash) {
        if (error) {
          return next(error);
        }
        user.password = passwordHash;
        next();
      });
    });
  } else {
    return next();
  }
});
