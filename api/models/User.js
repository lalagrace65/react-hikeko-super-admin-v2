const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'super admin' },
    verified: { type: Boolean, required: true, default: false, },
},{ 
    timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
