import mongoose from 'mongoose';

const User = mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    followers: Number
});

module.exports = mongoose.model('UserModel', User);