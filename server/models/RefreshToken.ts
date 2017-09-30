import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const RefreshTokenSchema = new mongoose.Schema({
    _id: {
        type: String, unique: true,
        default: function () {
            return crypto.randomBytes(16).toString('hex');
        }
    },
    token: { type: String, required: true },
    userId: String,
    created: { type: Date, required: true, default: Date.now },
    updated: { type: Date, required: true, default: Date.now },
    createdBy: String,
    updatedBy: String
});

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
export { RefreshToken };
