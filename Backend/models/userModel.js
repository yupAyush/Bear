const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    role: [{ type: String, enum: ['user', 'admin'], default: 'user' }],

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: { type: String, required: true, select: false },
    refreshToken: { type: String, select: false },
    balance: {
        type: mongoose.Types.Decimal128,
        default: () => mongoose.Types.Decimal128.fromString('100'),
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            delete ret.refreshToken;
            if (ret.balance) ret.balance = ret.balance.toString();
        },
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;