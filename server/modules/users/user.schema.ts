import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

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
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});
