import mongoose from 'mongoose';

const User = mongoose.Schema({
    username: String,
    email: String,
    followers: String
});

module.exports = mongoose.model('UserModel', User);